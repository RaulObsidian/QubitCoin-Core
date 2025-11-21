QbitCoin Project — README (Reader)
=================================

Autor / Founder: Francisco Raúl Rueda Adán
Fecha de generación: 09 November 2025, 05:58 CET

Contenido del paquete:
- Whitepaper_Tecnico_Bilingue.pdf  (full technical whitepaper ES/EN/DE)
- Dossier_Corporativo_EN.pdf       (investor pitch)
- README_QbitCoin.pdf              (esta guía en PDF)
- Figures_3D/                      (imágenes 3D)
- Figures_Vector/                  (SVG infographics)
- Code_Prototypes/                 (Python + Rust skeletons)
- Simulator_Results/               (CSV and PNG simulation outputs)
- Hashes/                          (hashes_sha256.txt + verification_instructions.txt)

Instrucciones rápidas:
1) Si quieres convertir MD a PDF localmente y no has instalado herramientas, instala Pandoc:
   - Linux (Debian/Ubuntu): sudo apt install pandoc
   - macOS (brew): brew install pandoc
   - Windows: https://pandoc.org/installing.html

2) Alternativas: wkhtmltopdf + pip install pdfkit, o pip install weasyprint.

3) Para ejecutar el simulador de ejemplo:
   python Code_Prototypes/rubikpow_simulator.py

4) Para verificar hashes:
   sha256sum Whitepaper_Tecnico_Bilingue.pdf

Detalles de verificación e instrucciones avanzadas se encuentran en /Hashes/verification_instructions.txt
