<!DOCTYPE html>
<html>

<head>

	<!-- Meta tags  -->
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">

	<title>Juliano</title>
	<link rel="icon" type="image/png" href="assets/images/favicon.png">

	<!-- CSS Assets -->
	<link rel="stylesheet" href="assets/css/app.css">

	<style>
		body {
			padding: 20px;
		}
		span.ativo.diaDaSemanaMenu {
    color: blue;
}
.tarefa-item:hover{

	
}
.menuTarefa {
    color: blue;
}
.tarefa-item{
	position: relative;
    padding: 20px;
    border-radius: 10px;
    color: #475569;
    margin: 10px 0px;
    box-shadow: 0px 0px 6px 2px #00000024;
}
.tarefa-item.text-success{
	border-left:10px solid #10b981;
}
.tarefa-item.text-warning {
	border-left:10px solid #ff9800;
}
.tarefa-item.text-error  {
	border-left:10px solid #ff5724;
}
.tarefa-concluida{
	color: #0dac0d;
}
.tarefa-nao-concluida{
	color: rgb(244, 67, 54);
}
	</style>

	<!-- Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
	<link href="css2?family=Inter:wght@400;500;600;700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">

	<script src="app/core/vue.global.js"></script>
	<script src="app/core/vue-router.global.js"></script>
</head>

<body>



	<div id="app">
		<div>
			<router-view></router-view>
		</div>
	</div>

	<script type="module">
		const {
			createApp
		} = Vue

		import UsuarioService from "/app/services/usuario/UsuarioService.js";

		import TarefasPagina from "/app/paginas/tarefas/TarefasPagina.js";
		import LoginPagina from "/app/paginas/LoginPagina.js";

		const NotFoundPaginaComponente = {
			template: "<h1>404</h1>"
		}

		function authRotaUsuario(ant, pro) {
			if (UsuarioService.usuarioLogado()) {
				return true;
			} else {
				router.push("/login")
			}
		}

		const router = VueRouter.createRouter({
			history: VueRouter.createWebHashHistory(),
			routes: [{
					path: '/',
					component: TarefasPagina,
					beforeEnter: [authRotaUsuario],
					props: true
				},
				{
					path: '/login',
					component: LoginPagina,
					props: true
				}
			]
		})

		const aplicacao = createApp({})

		aplicacao.use(router)

		aplicacao.mount('#app')

	</script>

</body>

</html>