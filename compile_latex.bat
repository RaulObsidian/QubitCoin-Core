@echo off
echo Compilando whitepapers LaTeX al directorio whitepaper...

cd /d "D:\Proyecto_QBC\whitepaper"

echo Compilando QbitCoin_Whitepaper_ES.tex...
xelatex -include-directory=. -output-directory=. QbitCoin_Whitepaper_ES.tex
xelatex -include-directory=. -output-directory=. QbitCoin_Whitepaper_ES.tex
xelatex -include-directory=. -output-directory=. QbitCoin_Whitepaper_ES.tex

echo Compilando QbitCoin_Whitepaper_EN.tex...
xelatex -include-directory=. -output-directory=. QbitCoin_Whitepaper_EN.tex
xelatex -include-directory=. -output-directory=. QbitCoin_Whitepaper_EN.tex
xelatex -include-directory=. -output-directory=. QbitCoin_Whitepaper_EN.tex

echo Compilando QbitCoin_Whitepaper_DE.tex...
xelatex -include-directory=. -output-directory=. QbitCoin_Whitepaper_DE.tex
xelatex -include-directory=. -output-directory=. QbitCoin_Whitepaper_DE.tex
xelatex -include-directory=. -output-directory=. QbitCoin_Whitepaper_DE.tex

echo Compilacion de whitepapers completa.