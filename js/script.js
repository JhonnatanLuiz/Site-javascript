/**
 * JavaScript para o Site JavaScript Tutorial
 * Funcionalidades gerais do site
 */

// ========================================
// NAVEGAÇÃO RESPONSIVA
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    console.log('Site JavaScript Tutorial carregado!');

    // Inicializar menu hambúrguer mobile
    initMobileMenu();

    // Detectar página ativa
    highlightActivePage();

    // Scroll suave para âncoras
    initSmoothScroll();

    // Code syntax highlighting (básico)
    highlightCodeBlocks();
});

/**
 * Menu Hambúrguer Mobile - Funciona em todas as páginas
 */
function initMobileMenu() {
    // Elementos do menu
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenu = document.getElementById('closeMenu');

    // Verifica se os elementos existem (nem todas as páginas têm menu hambúrguer)
    if (!menuToggle || !sidebar || !menuOverlay || !closeMenu) {
        return;
    }

    const menuLinks = sidebar.querySelectorAll('a');

    // Função para abrir menu
    function openMenu() {
        sidebar.classList.remove('-translate-x-full');
        menuOverlay.classList.remove('hidden');
        setTimeout(() => menuOverlay.classList.remove('opacity-0'), 10);
        document.body.style.overflow = 'hidden'; // Previne scroll do body
    }

    // Função para fechar menu
    function closeMenuFunc() {
        sidebar.classList.add('-translate-x-full');
        menuOverlay.classList.add('opacity-0');
        setTimeout(() => menuOverlay.classList.add('hidden'), 300);
        document.body.style.overflow = ''; // Restaura scroll do body
    }

    // Event listeners
    menuToggle.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuFunc);
    menuOverlay.addEventListener('click', closeMenuFunc);

    // Fechar menu ao clicar em qualquer link (mobile)
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) { // lg breakpoint
                closeMenuFunc();
            }
        });
    });

    // Fechar menu com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !sidebar.classList.contains('-translate-x-full')) {
            closeMenuFunc();
        }
    });
}

/**
 * Destaca a página ativa no menu
 */
function highlightActivePage() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a, .sidebar a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') && currentPage.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}

/**
 * Scroll suave para links âncora
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Destaque simples de blocos de código
 */
function highlightCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code, .code-block');

    codeBlocks.forEach(block => {
        // Adiciona classe para estilização
        block.classList.add('highlighted');
    });
}

/**
 * Toggle para sidebar em mobile (será implementado)
 */
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

/**
 * Copiar código para clipboard
 */

/**
 * Formata data para exibição
 */
function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Debounce para otimizar eventos
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// CONTINUE.HTML DEMOS
// ========================================
function demo1() {
    let output = '';
    for (let i = 0; i < 10; i++) {
        if (i === 5) continue;
        output += "Número: " + i + "\n";
    }
    showResult('result1', output);
}

function demo2() {
    let output = '';
    for (let i = 0; i <= 10; i++) {
        if (i % 2 === 0) continue;
        output += "Número ímpar: " + i + "\n";
    }
    showResult('result2', output);
}

function demo3() {
    let output = 'Com Continue:\n';
    for (let i = 0; i < 5; i++) {
        if (i === 2) continue;
        output += i + "\n";
    }
    output += "\nCom Break:\n";
    for (let i = 0; i < 5; i++) {
        if (i === 2) break;
        output += i + "\n";
    }
    showResult('result3', output);
}

function demo4() {
    const numeros = [10, -5, 8, -3, 15, -1, 20];
    let output = '';
    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] < 0) {
            output += "⏭️  Pulando número negativo: " + numeros[i] + "\n";
            continue;
        }
        output += "✓ Processando: " + numeros[i] + "\n";
    }
    showResult('result4', output);
}

function demo5() {
    let output = '';
    let i = 0;
    while (i < 10) {
        i++;
        if (i % 3 === 0) continue;
        output += "Número: " + i + "\n";
    }
    showResult('result5', output);
}

function demo6() {
    const valores = [5, -2, 10, -8, 15, 3];
    let soma = 0;
    let output = '';
    for (let i = 0; i < valores.length; i++) {
        if (valores[i] < 0) {
            output += "Ignorando " + valores[i] + "\n";
            continue;
        }
        soma += valores[i];
        output += "Somando " + valores[i] + " (Total: " + soma + ")\n";
    }
    output += "\n✅ Soma final: " + soma;
    showResult('result6', output);
}

/**
 * Helper para exibir resultados de demos
 */
function showResult(elementId, text) {
    const resultDiv = document.getElementById(elementId);
    if (resultDiv) {
        const contentDiv = resultDiv.querySelector('div');
        if (contentDiv) {
            contentDiv.textContent = text;
        }
        resultDiv.classList.remove('hidden');
    }
}

// ============================================================================
// LOOPS.HTML - Funções de demonstração
// ============================================================================

function demoFor() {
    let output = '';
    for (let i = 0; i < 5; i++) {
        output += "Número: " + i + "\n";
    }
    const resultDiv = document.getElementById('result-for');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function demoWhile() {
    let output = '';
    let contador = 5;
    while (contador > 0) {
        output += "Contagem: " + contador + "\n";
        contador--;
    }
    output += "Fim!";
    const resultDiv = document.getElementById('result-while');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function demoDoWhile() {
    let output = '';
    let numero = 1;
    do {
        output += "Número: " + numero + "\n";
        numero++;
    } while (numero <= 3);
    const resultDiv = document.getElementById('result-dowhile');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function demoCompare() {
    let output = '';

    // For Loop
    for (let i = 1; i <= 3; i++) {
        output += "For: " + i + "\n";
    }
    output += "\n";

    // While Loop
    let j = 1;
    while (j <= 3) {
        output += "While: " + j + "\n";
        j++;
    }
    output += "\n";

    // Do-While Loop
    let k = 1;
    do {
        output += "Do-While: " + k + "\n";
        k++;
    } while (k <= 3);

    const resultDiv = document.getElementById('result-compare');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

// ============================================================================
// LOOPS_FOR.HTML - Funções de demonstração
// ============================================================================

function loopsFor_demo1() {
    let output = '';
    for (let i = 0; i < 5; i++) {
        output += "O número é " + i + "\n";
    }
    const resultDiv = document.getElementById('result1');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsFor_demo2() {
    const frutas = ["Maçã", "Banana", "Laranja", "Uva"];
    let output = '';
    for (let i = 0; i < frutas.length; i++) {
        output += frutas[i] + "\n";
    }
    const resultDiv = document.getElementById('result2');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsFor_demo3() {
    let output = '';
    for (let i = 5; i >= 1; i--) {
        output += "Contagem regressiva: " + i + "\n";
    }
    output += "🚀 Lançamento!";
    const resultDiv = document.getElementById('result3');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsFor_demo4() {
    let output = '';
    for (let i = 0; i <= 10; i += 2) {
        output += "Número par: " + i + "\n";
    }
    const resultDiv = document.getElementById('result4');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsFor_demo5() {
    let output = '';
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            output += i + " x " + j + " = " + (i * j) + "\n";
        }
        output += "---\n";
    }
    const resultDiv = document.getElementById('result5');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsFor_demo6() {
    let soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += i;
    }
    const output = "A soma de 1 a 10 é: " + soma;
    const resultDiv = document.getElementById('result6');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsFor_demo7() {
    let i = 0;
    let output = '';
    for (; i < 3; i++) {
        output += "Valor de i: " + i + "\n";
    }
    const resultDiv = document.getElementById('result7');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

// ============================================================================
// LOOPS_WHILE.HTML - Funções de demonstração
// ============================================================================

function loopsWhile_demo1() {
    let output = '';
    let i = 0;
    while (i < 5) {
        output += "O número é " + i + "\n";
        i++;
    }
    const resultDiv = document.getElementById('result1');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsWhile_demo2() {
    let output = '';
    let contador = 10;
    while (contador > 0) {
        output += "Faltam " + contador + " segundos\n";
        contador--;
    }
    output += "🎉 Tempo esgotado!";
    const resultDiv = document.getElementById('result2');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsWhile_demo3() {
    let output = '';
    let i = 0;
    do {
        output += "O número é " + i + "\n";
        i++;
    } while (i < 5);
    const resultDiv = document.getElementById('result3');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsWhile_demo4() {
    let output = '';

    // While Loop
    output += "--- While Loop ---\n";
    let x = 10;
    while (x < 5) {
        output += "While: " + x + "\n";
        x++;
    }
    if (x === 10) output += "(While não executou)\n";

    output += "\n--- Do-While Loop ---\n";
    // Do-While Loop
    let y = 10;
    do {
        output += "Do-While: " + y + "\n";
        y++;
    } while (y < 5);

    const resultDiv = document.getElementById('result4');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsWhile_demo5() {
    let soma = 0;
    let numero = 1;
    while (numero <= 100) {
        soma += numero;
        numero++;
    }
    const output = "A soma de 1 a 100 é: " + soma;
    const resultDiv = document.getElementById('result5');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsWhile_demo6() {
    const cores = ["Vermelho", "Verde", "Azul", "Amarelo"];
    let output = '';
    let i = 0;
    while (i < cores.length) {
        output += "Cor " + (i + 1) + ": " + cores[i] + "\n";
        i++;
    }
    const resultDiv = document.getElementById('result6');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

// ============================================================================
// BREAK.HTML - Funções de demonstração
// ============================================================================

function break_demo1() {
    let output = '';
    for (let i = 0; i < 10; i++) {
        if (i === 5) {
            break;
        }
        output += "Número: " + i + "\n";
    }
    const resultDiv = document.getElementById('result1');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function break_demo2() {
    let output = '';
    let i = 0;
    while (i < 10) {
        output += "Contando: " + i + "\n";
        i++;

        if (i === 7) {
            output += "🛑 Break ativado!\n";
            break;
        }
    }
    const resultDiv = document.getElementById('result2');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function break_demo3() {
    const frutas = ["Maçã", "Banana", "Laranja", "Uva", "Manga"];
    let procurar = "Laranja";
    let encontrado = false;
    let output = '';

    for (let i = 0; i < frutas.length; i++) {
        output += "Verificando: " + frutas[i] + "\n";

        if (frutas[i] === procurar) {
            output += "✅ Encontrado!\n";
            encontrado = true;
            break;
        }
    }

    const resultDiv = document.getElementById('result3');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function break_demo4() {
    let output = '';
    for (let i = 1; i <= 3; i++) {
        output += "Grupo " + i + "\n";

        for (let j = 1; j <= 5; j++) {
            if (j === 3) {
                output += "  Break no loop interno\n";
                break;
            }
            output += "  Item " + j + "\n";
        }
    }
    const resultDiv = document.getElementById('result4');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function break_demo5() {
    const numeros = [5, 10, -3, 20, 15];
    let todosPositivos = true;
    let output = '';

    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] < 0) {
            output += "❌ Número negativo encontrado: " + numeros[i] + "\n";
            todosPositivos = false;
            break;
        }
        output += "✓ " + numeros[i] + " é positivo\n";
    }

    if (todosPositivos) {
        output += "✅ Todos os números são positivos!";
    }

    const resultDiv = document.getElementById('result5');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

// ========================================
// NUMBERS.HTML DEMOS
// ========================================
function numbers_demo1() {
    let x = 0.1 + 0.2;
    showResult('result1', "0.1 + 0.2 = " + x);
}
function numbers_demo2() {
    let x = 10;
    let y = "20";
    let z = x + y;
    showResult('result2', "10 + '20' = " + z);
}
function numbers_demo3() {
    let x = 100 / "Apple";
    showResult('result3', "100 / 'Apple' = " + x);
}
function numbers_demo4() {
    let myNumber = 2;
    let txt = "";
    while (myNumber != Infinity) {
        myNumber = myNumber * myNumber;
        txt = txt + myNumber + "<br>";
    }
    showResult('result4', txt);
}
function numbers_demo5() {
    let x = 0xFF;
    showResult('result5', "0xFF = " + x);
}

// ========================================
// NUMBER_METHODS.HTML DEMOS
// ========================================
function numberMethods_demo1() {
    let x = 123;
    showResult('result1', x.toString() + "<br>" + (123).toString() + "<br>" + (100 + 23).toString());
}
function numberMethods_demo2() {
    let x = 9.656;
    showResult('result2', x.toFixed(0) + "<br>" + x.toFixed(2) + "<br>" + x.toFixed(4) + "<br>" + x.toFixed(6));
}
function numberMethods_demo3() {
    let x = 9.656;
    showResult('result3', x.toPrecision() + "<br>" + x.toPrecision(2) + "<br>" + x.toPrecision(4) + "<br>" + x.toPrecision(6));
}
function numberMethods_demo4() {
    showResult('result4', Number(true) + "<br>" + Number(false) + "<br>" + Number("10") + "<br>" + Number("  10") + "<br>" + Number("10  ") + "<br>" + Number(" 10  ") + "<br>" + Number("10.33") + "<br>" + Number("10,33") + "<br>" + Number("10 33") + "<br>" + Number("John"));
}
function numberMethods_demo5() {
    showResult('result5', parseInt("-10") + "<br>" + parseInt("-10.33") + "<br>" + parseInt("10") + "<br>" + parseInt("10.33") + "<br>" + parseInt("10 20 30") + "<br>" + parseInt("10 years") + "<br>" + parseInt("years 10"));
}
function numberMethods_demo6() {
    showResult('result6', Number.isInteger(10) + "<br>" + Number.isInteger(10.5));
}

// ========================================
// NUMBER_PROPERTIES.HTML DEMOS
// ========================================
function numberProperties_demo1() {
    let x = Number.EPSILON;
    showResult('result1', x);
}
function numberProperties_demo2() {
    showResult('result2', "MAX_VALUE: " + Number.MAX_VALUE + "<br>MIN_VALUE: " + Number.MIN_VALUE);
}
function numberProperties_demo3() {
    showResult('result3', "MAX_SAFE_INTEGER: " + Number.MAX_SAFE_INTEGER + "<br>MIN_SAFE_INTEGER: " + Number.MIN_SAFE_INTEGER);
}

// ========================================
// BITWISE.HTML DEMOS
// ========================================
function bitwise_demo1() {
    showResult('result1', "5 & 1 = " + (5 & 1));
}
function bitwise_demo2() {
    showResult('result2', "5 | 1 = " + (5 | 1));
}
function bitwise_demo3() {
    showResult('result3', "5 ^ 1 = " + (5 ^ 1));
}
function bitwise_demo4() {
    showResult('result4', "~5 = " + (~5));
}
function bitwise_demo5() {
    showResult('result5', "5 << 1 = " + (5 << 1) + "<br>5 >> 1 = " + (5 >> 1) + "<br>5 >>> 1 = " + (5 >>> 1));
}
function bitwise_demo6() {
    showResult('result6', dec2bin(-5));
}
function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

// ========================================
// BIGINT.HTML DEMOS
// ========================================
function bigint_demo1() {
    let x = 1234567890123456789012345n;
    let y = BigInt("1234567890123456789012345");
    showResult('result1', x + "<br>" + y);
}
function bigint_demo2() {
    let x = 9007199254740995n;
    let y = 9007199254740995n;
    let z = x * y;
    showResult('result2', z);
}
function bigint_demo3() {
    let x = 5n;
    let y = Number(x) / 2;
    showResult('result3', y);
}
function bigint_demo4() {
    showResult('result4', typeof 1234567890123456789012345n);
}

// ========================================
// FUNCTIONS.HTML DEMOS
// ========================================
function functions_demo1() {
    myFunction();
}
function myFunction() {
    showResult('result1', "Minha primeira função foi chamada!");
}

function functions_demo2() {
    let x = myFunctionProduct(4, 3);
    showResult('result2', "O produto de 4 e 3 é: " + x);
}
function myFunctionProduct(p1, p2) {
    return p1 * p2;
}

function functions_demo3() {
    let fahrenheit = 77;
    let celsius = toCelsius(fahrenheit);
    showResult('result3', fahrenheit + "°F é igual a " + celsius + "°C");
}
function toCelsius(fahrenheit) {
    return (5 / 9) * (fahrenheit - 32);
}

function functions_demo4() {
    let text = "A temperatura é " + toCelsius(77) + " Celsius";
    showResult('result4', text);
}

function functions_demo5() {
    let carName = "Volvo";
    let text = "Dentro da função: " + typeof carName + " " + carName;
    showResult('result5', text);
}

// ========================================
// EVENTS.HTML DEMOS
// ========================================
function events_demo1() {
    showResult('result1', Date());
}

// ========================================
// ARRAYS.HTML DEMOS
// ========================================
function arrays_demo1() {
    const cars = ["Saab", "Volvo", "BMW"];
    showResult('result1', cars);
}

function arrays_demo2() {
    const cars = ["Saab", "Volvo", "BMW"];
    showResult('result2', cars[0]);
}

function arrays_demo3() {
    const cars = ["Saab", "Volvo", "BMW"];
    cars[0] = "Opel";
    showResult('result3', cars);
}

function arrays_demo4() {
    const cars = ["Saab", "Volvo", "BMW"];
    showResult('result4', cars.toString());
}

function arrays_demo5() {
    const cars = ["Saab", "Volvo", "BMW"];
    showResult('result5', typeof cars);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        highlightActivePage,
        toggleSidebar,
        copyCode,
        runCode,
        formatDate,
        debounce,
        demo1,
        demo2,
        demo3,
        demo4,
        demo5,
        demo6,
        showResult
    };
}