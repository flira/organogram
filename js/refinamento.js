var primeiro, ultimo;
//variaveis universais que serão preenchidas com a primeira e ultima diretorias.

$(document).ready( function () {
	primeiro = definirPrimeiro( );
	/*	Define a primeira diretoria confirmando que ela não é a assessoria
	e nem o serviço de administração. */
	ultimo = definirUltimo( );
	/*	Define a ultima diretoria confirmando que ela não é a assessoria
	e nem o serviço de administração. */
	inicializacao();
	/*	Função que define as margens da primeira e da ultima diretoria */
	definirLarguraTotal(
	/*	Função que define a largura final do organograma */
		calcularLarguraTotal()
		/*	Função que calcula a largura que todas as
			secretarias ocupam estando uma ao lado da outra */
	);
	ajusteExcecoes();
	/*	Função para reposicionar as células das Assessorias
		e dos serviços de administração */
	definirLinhaCentral();
	/*	Função para redimensionar a altura da linha central */
});
function definirPrimeiro ( ) {
	var n,m;
	for (var i = $("div.organograma>ul>li>ul>li").length;i > 0;i--) {
		if($("div.organograma>ul>li>ul>li:nth-child("+i+")").attr("id")== undefined)n=i;
	}	m = "div.organograma>ul>li>ul>li:nth-child("+n+")";
	return m;
}
function definirUltimo ( ) {
	var n,m;
	for (var i=1;i <= $("div.organograma>ul>li>ul>li").length;i++) {
		if($("div.organograma>ul>li>ul>li:nth-child("+i+")").attr("id")==undefined)n=i;
	}	m = "div.organograma>ul>li>ul>li:nth-child("+n+")";
	return m;
}
function inicializacao() {
	var tilt = 2.75 - calcularNDiretorias();
	/*	Sendo sincero, eu não sei por que essa variável funciona, mas funciona
		para centralização na maioria dos casos que precisamos */
	$(primeiro).css({
		'margin-left' : '17px',
		'background-position' : '55px -10px',
		'padding-left':'0'
	});
	$(ultimo).css("margin-right",tilt+"px");
}
function calcularLarguraTotal() {
	var c,b,a = calcularNDiretorias();
	if (a == 1)	$("div.organograma>ul>li>ul>li").css(
		{'background' : 'none',
		'margin-top' : '195px'
	});
	/*	Caso aja apenas 1 diretoria, desfaz a criação dos ramos para as mesmas e a liga
		diretamente com a secretaria */
	b = parseFloat($(primeiro).css("margin-left"));
	c = parseFloat($(ultimo).css("margin-right"));
	d = $(primeiro).outerWidth(true);
	
	a *=	d -	(b - c);
	/*	Multiplica a quantidade de diretorias pelos seus tamanhos, incluindo as margens */
	return a;
}
function calcularNDiretorias() {
	var i = $("div.organograma>ul>li>ul>li").length;
	//	Define a variável "a" como a quantidade de células de serviço de diretoria
	i -= $("#as").length + $("#sa").length;
	/*	Subtrai a Assessoria e o Serviço de Administração do total de diretorias,
		já que esses não influenciam na largura final do organograma */
	return i;
}
function definirLarguraTotal (x) {
	if (x > $("div.organograma").width) {
		/*	cria uma margem lateral no organograma com mero fim estético
			caso seja necessário o uso do scroll horizontal */
		var margem = 15;
		//variavel que define o tamanho dessa margem lateral
		$(primeiro).css("margin-left",margem+"px");
		$(ultimo).css("margin-right",margem+"px");
		x+=margem * 2;
	}	$("div.organograma>ul>li>ul").width(x);
	$("div.organograma>ul>li").width(x);
	$("div.organograma>ul>li>ul>li>ul>li:last-child").css("background-position","-95px 50px");
	//cria a ligação final da ultima célula de serviço
}
function ajusteExcecoes() {
	var a = $("div.organograma>ul>li>ul").width( );
	if($("#sa").length==1)$("#sa").css("left",(a/2) - $("#sa").outerWidth(true));
	if($("#as").length==1)$("#as").css("right",(a/2) - $("#as").outerWidth(true));
}
function definirLinhaCentral ( ) {
	var size,a = Math.max($("#sa").height(),$("#as").height());
	size = a+50;
	$("div.organograma>ul>li>ul>li").not("#as,#sa").css("margin-top",size-5+"px");
	$("div.organograma>ul>li").css("padding-bottom",size+"px");	
}