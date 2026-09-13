import pandas as pd, numpy as np

# ---- hand-rolled t-distribution (no scipy available) ----
TCRIT = {1:12.706,2:4.303,3:3.182,4:2.776,5:2.571,6:2.447,7:2.365,8:2.306,9:2.262,10:2.228,
11:2.201,12:2.179,13:2.160,14:2.145,15:2.131,16:2.120,17:2.110,18:2.101,19:2.093,20:2.086,
21:2.080,22:2.074,23:2.069,24:2.064,25:2.060,26:2.056,27:2.052,28:2.048,29:2.045,30:2.042,
31:2.040,32:2.037,33:2.035,34:2.032,35:2.030,36:2.028,37:2.026,38:2.024,39:2.023,40:2.021}
def tcrit(df):
    lo=max(1,min(int(np.floor(df)),40)); hi=max(1,min(int(np.ceil(df)),40))
    if lo==hi: return TCRIT[lo]
    f=df-lo; return TCRIT[lo]*(1-f)+TCRIT[hi]*f
def t_pdf(x, df):
    from math import lgamma, pi, exp
    c=exp(lgamma((df+1)/2)-lgamma(df/2))/np.sqrt(df*pi)
    return c*(1+x**2/df)**(-(df+1)/2)
def t_p_two(tval, df):
    xs=np.linspace(abs(tval), abs(tval)+50, 200000)
    return 2*np.trapz(t_pdf(xs,df), xs)
def paired_ttest(x, label):
    x = np.asarray(x, dtype=float)
    n = len(x); m = x.mean(); sd = x.std(ddof=1); se = sd/np.sqrt(n); tc = tcrit(n-1)
    tval = m/se; p = t_p_two(tval, n-1); d = m/sd
    print(f"{label}: mean diff={m:+.3f}  95%CI [{m-tc*se:+.3f}, {m+tc*se:+.3f}]  "
          f"t({n-1})={tval:.2f}  p={p:.4f}  Cohen's d={d:.2f}  n={n}")
    return dict(mean=m, ci_lo=m-tc*se, ci_hi=m+tc*se, t=tval, df=n-1, p=p, d=d, n=n)

# ---- load data ----
df = pd.read_csv('/sessions/relaxed-serene-turing/mnt/Desktop/icatcher_results_batch3/icatcher_summary_combined.csv')

def distal_frames(row):
    return row["Left Looking Frames"] if row["Direction"] == "forward" else row["Right Looking Frames"]
def proximal_frames(row):
    return row["Right Looking Frames"] if row["Direction"] == "forward" else row["Left Looking Frames"]

df["distal_frames"] = df.apply(distal_frames, axis=1)
df["proximal_frames"] = df.apply(proximal_frames, axis=1)
df["char_frames_total"] = df["Left Looking Frames"] + df["Right Looking Frames"]
df["punished_frames"] = np.where(df["Condition"] == "distal", df["distal_frames"], df["proximal_frames"])
df["punished_prop"] = df["punished_frames"] / df["char_frames_total"]

# congruent = distal punished in chains OR proximal punished in single_cause
df["congruent"] = ((df["Context"] == "chains") & (df["Condition"] == "distal")) | \
                   ((df["Context"] == "single_cause") & (df["Condition"] == "proximal"))

print("=== Trial counts ===")
print(df.groupby(["Context", "Condition"]).size())
print()

print("=== Raw punished-character looking (mean +/- SD), by context x condition ===")
for ctx in ["chains", "single_cause"]:
    for cond in ["distal", "proximal"]:
        sub = df[(df.Context == ctx) & (df.Condition == cond)]
        print(f"  {ctx:12s} {cond:9s} punished: frames={sub['punished_frames'].mean():.1f} (SD={sub['punished_frames'].std():.1f})  "
              f"prop={sub['punished_prop'].mean():.3f} (SD={sub['punished_prop'].std():.3f})  n={len(sub)}")
print()

# ---- Part A, exactly as asked ----
print("="*78)
print("PART A: looking at the PUNISHED character -- fair (congruent) vs unfair (incongruent)")
print("="*78)

results = {}
for ctx, congruent_cond, incongruent_cond in [
    ("chains", "distal", "proximal"),
    ("single_cause", "proximal", "distal"),
]:
    sub = df[df.Context == ctx]
    wide = sub.pivot_table(index="Response UUID", columns="Condition", values="punished_prop")
    wide = wide.dropna(subset=["distal", "proximal"])
    diff = wide[incongruent_cond] - wide[congruent_cond]   # unfair - fair
    print(f"\n--- {ctx} ---")
    print(f"  congruent/fair   = {congruent_cond}-punished trial (looking at {congruent_cond})")
    print(f"  incongruent/unfair = {incongruent_cond}-punished trial (looking at {incongruent_cond})")
    print(f"  fair looking prop:   mean={wide[congruent_cond].mean():.3f}  n={wide[congruent_cond].notna().sum()}")
    print(f"  unfair looking prop: mean={wide[incongruent_cond].mean():.3f}  n={wide[incongruent_cond].notna().sum()}")
    res = paired_ttest(diff.values, f"  paired diff (unfair - fair) [{ctx}]")
    results[ctx] = res

print()
print("Positive diff/CI excluding 0 = looking at the punished character is reliably LONGER when the")
print("punishment is unfair (incongruent) than when it's fair (congruent), within that context.")
