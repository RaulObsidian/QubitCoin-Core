#!/usr/bin/env python3
# build_qbitcoin_project_final.py
# Robust generator: creates the full QbitCoin project tree, SVG placeholders, markdowns, code, CSVs,
# tries Pandoc conversion if available, then creates ZIP and SHA-256 hashes.
#
# Usage:
#   python3 build_qbitcoin_project_final.py
#
# Tested on Python 3.8+

import os, sys, shutil, hashlib, zipfile, subprocess
from pathlib import Path
from datetime import datetime

# --- Config ---
ROOT = Path.cwd() / "QbitCoin_Project_Complete"
FIG3D = ROOT / "Figures_3D"
FIGV = ROOT / "Figures_Vector"
CODE = ROOT / "Code_Prototypes"
SIM = ROOT / "Simulator_Results"
HASHES = ROOT / "Hashes"

DATE_STR = datetime.now().strftime("%d %B %Y, %H:%M CET")
AUTHOR = "Francisco Raúl Rueda Adán"

# --- Helpers ---
def ensure_dirs():
    for p in (ROOT, FIG3D, FIGV, CODE, SIM, HASHES):
        p.mkdir(parents=True, exist_ok=True)

def write_text(path: Path, content: str, mode="w"):
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, mode, encoding="utf-8") as f:
        f.write(content)

def sha256_file(path: Path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()

def write_svg(path: Path, title="Placeholder", w=1200, h=800, bgcolor="#141a2e", txtcolor="#ffffff"):
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
  <rect width="100%" height="100%" fill="{bgcolor}"/>
  <text x="50%" y="50%" font-family="Arial, Helvetica, sans-serif" font-size="36" fill="{txtcolor}"
        dominant-baseline="middle" text-anchor="middle">{title}</text>
</svg>'''
    write_text(path, svg)

def try_pandoc(md_path: Path, pdf_path: Path):
    pandoc = shutil.which("pandoc")
    if not pandoc:
        return False
    cmd = [pandoc, str(md_path), "-o", str(pdf_path)]
    try:
        subprocess.run(cmd, check=True)
        return True
    except subprocess.CalledProcessError as e:
        print("Pandoc failed:", e)
        return False

# --- Content (concise; full content you can expand later) ---
WHITE_MD = ROOT / "Whitepaper_Tecnico_Bilingue.md"
DOSSIER_MD = ROOT / "Dossier_Corporativo_EN.md"
README_MD = ROOT / "README_QbitCoin.md"

WHITE_CONTENT = f"""# QbitCoin (QBC) — Whitepaper técnico completo

Autor: {AUTHOR}
Fecha: {DATE_STR}

## Resumen (ES / EN / DE)

(Esta es la versión base. La versión final en PDF incluirá figuras y apéndices.)
"""

DOSSIER_CONTENT = f"""# QbitCoin — Investor Dossier (EN)

Project: QbitCoin — The Quantum Cube Blockchain
Founder: {AUTHOR}
Date: {DATE_STR}

Executive pitch and slides content (base).
"""

README_CONTENT = f"""QbitCoin Project — README (Reader)
Author: {AUTHOR}
Generated: {DATE_STR}

Estructura:
- Whitepaper_Tecnico_Bilingue.md / .pdf
- Dossier_Corporativo_EN.md / .pdf
- Figures_3D/ (SVG)
- Figures_Vector/ (SVG)
- Code_Prototypes/
- Simulator_Results/
- Hashes/
- QbitCoin_Project_Complete.zip

Para convertir MD a PDF: instala pandoc y ejecuta el script nuevamente.
"""

# Code prototypes (toy)
SIM_CODE = '# rubikpow_simulator.py\\nprint("RubikPoW simulator prototype")\\n'
VERIF_CODE = '# rubikpow_verifier.py\\nprint("RubikPoW verifier prototype")\\n'
RUST_CODE = '// substrate_module_skeleton.rs (skeleton)\\n'

# --- Main ---
def main():
    print("Creating project folders...")
    ensure_dirs()

    print("Writing markdown files...")
    write_text(WHITE_MD, WHITE_CONTENT)
    write_text(DOSSIER_MD, DOSSIER_CONTENT)
    write_text(README_MD, README_CONTENT)

    print("Writing code prototypes...")
    write_text(CODE / "rubikpow_simulator.py", SIM_CODE)
    write_text(CODE / "rubikpow_verifier.py", VERIF_CODE)
    write_text(CODE / "substrate_module_skeleton.rs", RUST_CODE)
    write_text(CODE / "run_tests.sh", "#!/bin/bash\\necho Running simple tests\\npython3 rubikpow_simulator.py\\n")

    # make scripts executable on unix
    try:
        os.chmod(CODE / "run_tests.sh", 0o755)
    except Exception:
        pass

    print("Creating SVG placeholders for figures (3D + vector)...")
    write_svg(FIG3D / "RubikPoW_Network.svg", "RubikPoW Network (3D)")
    write_svg(FIG3D / "Cube_Evolution_Quantum.svg", "Cube Evolution (Quantum)")
    write_svg(FIG3D / "Hybrid_Network_PoW_PoS.svg", "Hybrid Network PoW/PoS")
    write_svg(FIG3D / "Mining_Flow_3D.svg", "Mining Flow (3D)")
    write_svg(FIG3D / "Layered_Security_Architecture.svg", "Layered Security Architecture")

    write_svg(FIGV / "Tokenomics_Flow.svg", "Tokenomics Flow")
    write_svg(FIGV / "Roadmap_2026_2028.svg", "Roadmap 2026-2028")
    write_svg(FIGV / "Security_Comparison.svg", "Security Comparison")
    write_svg(FIGV / "Institutional_Adoption.svg", "Institutional Adoption")
    write_svg(FIGV / "Quantum_Opportunity.svg", "Quantum Opportunity")

    print("Creating simulator result placeholders...")
    write_text(SIM / "qbitcoin_simulator_expanded_results.csv", "cube,k,use_sequences,L,space\\n3x3x3,1,False,20,4.3252e19\\n")
    write_text(SIM / "qbitcoin_simulator_recommendations.csv", "cube,k,safety_factor,recommended\\n3x3x3,2,100,secure\\n")
    write_text(SIM / "heatmap_quantum_time_log.png", "")  # empty placeholder (not image)

    # Attempt pandoc conversions (if pandoc is present)
    print("Attempting to convert Markdown to PDF via Pandoc (if installed)...")
    converted = []
    for md, pdf in [(WHITE_MD, ROOT / "Whitepaper_Tecnico_Bilingue.pdf"),
                    (DOSSIER_MD, ROOT / "Dossier_Corporativo_EN.pdf"),
                    (README_MD, ROOT / "README_QbitCoin.pdf")]:
        ok = try_pandoc(md, pdf)
        if ok:
            converted.append(pdf.name)
            print("Converted:", md.name, "->", pdf.name)

    # Create zip
    zip_path = Path.cwd() / "QbitCoin_Project_Complete.zip"
    print("Creating ZIP:", zip_path)
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for root, _, files in os.walk(ROOT):
            for fname in files:
                full = Path(root) / fname
                rel = full.relative_to(Path.cwd())
                zf.write(full, arcname=str(rel))

    # Compute hashes for key files
    print("Calculating SHA-256 hashes...")
    targets = []
    # prefer PDFs if exist
    for maybe in [ROOT / "Whitepaper_Tecnico_Bilingue.pdf", WHITE_MD]:
        if maybe.exists():
            targets.append(maybe)
            break
    for maybe in [ROOT / "Dossier_Corporativo_EN.pdf", DOSSIER_MD]:
        if maybe.exists():
            targets.append(maybe)
            break
    for maybe in [ROOT / "README_QbitCoin.pdf", README_MD]:
        if maybe.exists():
            targets.append(maybe)
            break
    targets.append(zip_path)

    with open(HASHES / "hashes_sha256.txt", "w", encoding="utf-8") as hf:
        for t in targets:
            h = sha256_file(t)
            hf.write(f"{t.name}  {h}\\n")
            print(f"  {t.name}: {h}")

    # verification instructions
    ver = f"Generated on {DATE_STR} by script. Author: {AUTHOR}\\n"
    write_text(HASHES / "verification_instructions.txt", ver)

    print("All done. Output path:", ROOT)
    print("ZIP path:", zip_path)
    print("Hashes file:", HASHES / "hashes_sha256.txt")
    print("If PDFs not generated, install pandoc and rerun the script to generate them automatically.")

if __name__ == "__main__":
    main()
