from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from pypdf import PdfWriter, PdfReader
import textwrap

summary_pdf = "summary.pdf"
c = canvas.Canvas(summary_pdf, pagesize=letter)

# Bold header
c.setFont("Helvetica-Bold", 12)
c.drawString(72, 750, "Markman Lab P-card Purchase")

# Rest of the lines
c.setFont("Helvetica", 12)
lines = [
    "PURPOSE: Human subjects recruitment through the Markman Lab.",
    "WHO: Sunny Zhao, research assistant in the Markman Lab",
    "WHAT: Pay participants for study on Prolific.com. The IRB number is 59627. The total cost was $158.66",
    "WHERE: Prolific.com",
    "WHY: Piloting experiment materials.",
    "WHEN: 5/12/26"
]

y = 725 # start a new line after the header
for line in lines:
    wrapped = textwrap.wrap(line, width=80)
    for wrap_line in wrapped:
        c.drawString(72, y, wrap_line)
        y -= 20
    y -= 5

c.save()

merger = PdfWriter()
merger.append(summary_pdf)

receipts = [
    "../prolific_summary_6a026dc021d349ddb1416664.pdf",
    "../prolific_summary_6a0282d2e7a868242098d0d3.pdf",
    "../prolific_summary_6a028713a81d0c22a9e11e12-2.pdf"
]

for pdf in receipts:
    merger.append(pdf)

output_filename = "markman_lab_5-12-26.pdf"
with open(output_filename, "wb") as f:
    merger.write(f)

print(f"Successfully updated {output_filename}")
