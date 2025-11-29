@echo off
echo Compilando documentos LaTeX al directorio investors...

cd /d "D:\Proyecto_QBC\investors"

echo Compilando pitch_deck_ES.tex...
xelatex -include-directory=figures -output-directory=. pitch_deck_ES.tex
xelatex -include-directory=figures -output-directory=. pitch_deck_ES.tex
xelatex -include-directory=figures -output-directory=. pitch_deck_ES.tex

echo Compilando pitch_deck_EN.tex...
xelatex -include-directory=figures -output-directory=. pitch_deck_EN.tex
xelatex -include-directory=figures -output-directory=. pitch_deck_EN.tex
xelatex -include-directory=figures -output-directory=. pitch_deck_EN.tex

echo Compilando pitch_deck_DE.tex...
xelatex -include-directory=figures -output-directory=. pitch_deck_DE.tex
xelatex -include-directory=figures -output-directory=. pitch_deck_DE.tex
xelatex -include-directory=figures -output-directory=. pitch_deck_DE.tex

echo Compilando dossier_v2_ES.tex...
xelatex -include-directory=figures -output-directory=. dossier_v2_ES.tex
xelatex -include-directory=figures -output-directory=. dossier_v2_ES.tex
xelatex -include-directory=figures -output-directory=. dossier_v2_ES.tex

echo Compilando dossier_v2_EN.tex...
xelatex -include-directory=figures -output-directory=. dossier_v2_EN.tex
xelatex -include-directory=figures -output-directory=. dossier_v2_EN.tex
xelatex -include-directory=figures -output-directory=. dossier_v2_EN.tex

echo Compilando dossier_v2_DE.tex...
xelatex -include-directory=figures -output-directory=. dossier_v2_DE.tex
xelatex -include-directory=figures -output-directory=. dossier_v2_DE.tex
xelatex -include-directory=figures -output-directory=. dossier_v2_DE.tex

echo Renombrando archivos PDF a sus nombres finales...
if exist pitch_deck_ES.pdf ren pitch_deck_ES.pdf "Pitch_Deck_QbitCoin_ES.pdf"
if exist pitch_deck_EN.pdf ren pitch_deck_EN.pdf "Pitch_Deck_QbitCoin_EN.pdf"
if exist pitch_deck_DE.pdf ren pitch_deck_DE.pdf "Pitch_Deck_QbitCoin_DE.pdf"
if exist dossier_v2_ES.pdf ren dossier_v2_ES.pdf "Dossier_Inversores_v2_ES.pdf"
if exist dossier_v2_EN.pdf ren dossier_v2_EN.pdf "Dossier_Inversores_v2_EN.pdf"
if exist dossier_v2_DE.pdf ren dossier_v2_DE.pdf "Dossier_Inversores_v2_DE.pdf"

echo Compilacion completa.