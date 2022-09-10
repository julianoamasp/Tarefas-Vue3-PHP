-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 10-Set-2022 às 20:53
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `tarefas`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `auxdiassemana`
--

CREATE TABLE `auxdiassemana` (
  `AuxDiasSemanaId` int(11) NOT NULL,
  `AuxDiasSemanaNome` varchar(30) NOT NULL,
  `AuxDiasSemanaIcone` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `auxdiassemana`
--

INSERT INTO `auxdiassemana` (`AuxDiasSemanaId`, `AuxDiasSemanaNome`, `AuxDiasSemanaIcone`) VALUES
(1, 'Domingo', ''),
(2, 'Segunda', ''),
(3, 'Terça', ''),
(4, 'Quarta', ''),
(5, 'Quinta', ''),
(6, 'Sexta', ''),
(7, 'Sábado', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `auxprioridade`
--

CREATE TABLE `auxprioridade` (
  `auxPrioridadeId` int(11) NOT NULL,
  `auxPrioridadeNome` varchar(30) NOT NULL,
  `auxPrioridadeIcone` varchar(60) NOT NULL,
  `auxPrioridadeCor` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `auxprioridade`
--

INSERT INTO `auxprioridade` (`auxPrioridadeId`, `auxPrioridadeNome`, `auxPrioridadeIcone`, `auxPrioridadeCor`) VALUES
(1, 'Baixa', '', 'text-success'),
(2, 'Média', '', 'text-warning'),
(3, 'Alta', '', 'text-error');

-- --------------------------------------------------------

--
-- Estrutura da tabela `auxtarefatipo`
--

CREATE TABLE `auxtarefatipo` (
  `auxtarefatipoId` int(11) NOT NULL,
  `auxtarefatipoNome` varchar(100) NOT NULL,
  `auxtarefatipoDescricao` varchar(600) NOT NULL,
  `auxtarefatipoDtCad` datetime DEFAULT NULL,
  `auxtarefatipoStatus` varchar(3) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `auxtarefatipo`
--

INSERT INTO `auxtarefatipo` (`auxtarefatipoId`, `auxtarefatipoNome`, `auxtarefatipoDescricao`, `auxtarefatipoDtCad`, `auxtarefatipoStatus`) VALUES
(1, 'Semanal', 'Irá repetir semanalmente os dias que forem selecionados, enquanto a tarefa estiver ativa.', NULL, 'A');

-- --------------------------------------------------------

--
-- Estrutura da tabela `categorias`
--

CREATE TABLE `categorias` (
  `CategoriasId` int(11) NOT NULL,
  `CategoriasIdUsuario` int(11) NOT NULL,
  `CategoriasNome` varchar(60) NOT NULL,
  `CategoriasDescricao` varchar(300) NOT NULL,
  `CategoriasDtCad` datetime NOT NULL,
  `CategoriasStatus` varchar(3) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `categorias`
--

INSERT INTO `categorias` (`CategoriasId`, `CategoriasIdUsuario`, `CategoriasNome`, `CategoriasDescricao`, `CategoriasDtCad`, `CategoriasStatus`) VALUES
(1, 1, 'aaa', 'sadf', '2022-09-09 15:54:04', 'A');

-- --------------------------------------------------------

--
-- Estrutura da tabela `reldiassemanatarefa`
--

CREATE TABLE `reldiassemanatarefa` (
  `RelDiasSemanaTarefaId` int(11) NOT NULL,
  `RelDiasSemanaTarefaIdUsuario` int(11) NOT NULL,
  `RelDiasSemanaTarefaIdDia` int(11) NOT NULL,
  `RelDiasSemanaTarefaIdTarefa` int(11) NOT NULL,
  `RelDiasSemanaTarefaQtdeTempoTimestamp` int(11) DEFAULT NULL,
  `RelDiasSemanaTarefaPrioridade` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `reldiassemanatarefa`
--

INSERT INTO `reldiassemanatarefa` (`RelDiasSemanaTarefaId`, `RelDiasSemanaTarefaIdUsuario`, `RelDiasSemanaTarefaIdDia`, `RelDiasSemanaTarefaIdTarefa`, `RelDiasSemanaTarefaQtdeTempoTimestamp`, `RelDiasSemanaTarefaPrioridade`) VALUES
(1, 1, 6, 1, 34, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `subcategorias`
--

CREATE TABLE `subcategorias` (
  `subcategoriasId` int(11) NOT NULL,
  `subcategoriasIdUsuario` int(11) NOT NULL,
  `subcategoriasIdCategoria` int(11) NOT NULL,
  `subcategoriasNome` varchar(60) NOT NULL,
  `subcategoriasDtCad` datetime NOT NULL,
  `subcategoriasStatus` varchar(2) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `subcategorias`
--

INSERT INTO `subcategorias` (`subcategoriasId`, `subcategoriasIdUsuario`, `subcategoriasIdCategoria`, `subcategoriasNome`, `subcategoriasDtCad`, `subcategoriasStatus`) VALUES
(1, 1, 1, 'asdf', '2022-09-09 15:54:08', 'A');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tarefaevento`
--

CREATE TABLE `tarefaevento` (
  `TarefaEventoId` int(11) NOT NULL,
  `TarefaEventoIdUsuario` int(11) NOT NULL,
  `TarefaEventoIdTarefa` int(11) NOT NULL,
  `TarefaEventoInicio` datetime NOT NULL,
  `TarefaEventoTermino` datetime NOT NULL,
  `TarefaEventoTimestampQtde` int(11) NOT NULL DEFAULT 0,
  `TarefaEventoStatus` varchar(3) DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tarefaevento`
--

INSERT INTO `tarefaevento` (`TarefaEventoId`, `TarefaEventoIdUsuario`, `TarefaEventoIdTarefa`, `TarefaEventoInicio`, `TarefaEventoTermino`, `TarefaEventoTimestampQtde`, `TarefaEventoStatus`) VALUES
(1, 1, 1, '2022-09-09 15:54:26', '2022-09-09 15:54:26', 6, 'A');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tarefas`
--

CREATE TABLE `tarefas` (
  `TarefasId` int(11) NOT NULL,
  `TarefasIdUsuario` int(11) NOT NULL,
  `TarefasSubCatId` int(11) NOT NULL,
  `TarefasIdTipo` int(11) DEFAULT NULL,
  `TarefasIdPrioridade` int(11) DEFAULT NULL,
  `TarefasNome` varchar(100) NOT NULL,
  `TarefasDescricao` varchar(300) NOT NULL,
  `TarefasHtml` text DEFAULT NULL,
  `TarefasDtCad` datetime NOT NULL,
  `TarefasStatus` varchar(3) DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `tarefas`
--

INSERT INTO `tarefas` (`TarefasId`, `TarefasIdUsuario`, `TarefasSubCatId`, `TarefasIdTipo`, `TarefasIdPrioridade`, `TarefasNome`, `TarefasDescricao`, `TarefasHtml`, `TarefasDtCad`, `TarefasStatus`) VALUES
(1, 1, 1, 1, 2, 'asdf', 'asdf', '', '2022-09-09 15:54:26', 'A');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `UsuariosId` int(11) NOT NULL,
  `UsuariosNome` varchar(60) NOT NULL,
  `UsuariosSenha` varchar(70) NOT NULL,
  `UsuariosEmail` varchar(300) NOT NULL,
  `UsuariosToken` varchar(300) DEFAULT NULL,
  `UsuariosDtCad` datetime NOT NULL,
  `UsuariosStatus` varchar(3) NOT NULL DEFAULT 'A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`UsuariosId`, `UsuariosNome`, `UsuariosSenha`, `UsuariosEmail`, `UsuariosToken`, `UsuariosDtCad`, `UsuariosStatus`) VALUES
(1, 'Juliano da silva mendes', '6ebe76c9fb411be97b3b0d48b791a7c9', 'julianoamasp@gmail.com', 'MjAyMjA5MDkxMDA5NTFKdWxpYW5vIGRhIHNpbHZhIG1lbmRlc2p1bGlhbm9hbWFzcEBnbWFpbC5jb202MzFiYTVjMzAxZGNh', '2022-09-03 21:14:05', 'A');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `auxdiassemana`
--
ALTER TABLE `auxdiassemana`
  ADD PRIMARY KEY (`AuxDiasSemanaId`);

--
-- Índices para tabela `auxprioridade`
--
ALTER TABLE `auxprioridade`
  ADD PRIMARY KEY (`auxPrioridadeId`);

--
-- Índices para tabela `auxtarefatipo`
--
ALTER TABLE `auxtarefatipo`
  ADD PRIMARY KEY (`auxtarefatipoId`);

--
-- Índices para tabela `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`CategoriasId`);

--
-- Índices para tabela `reldiassemanatarefa`
--
ALTER TABLE `reldiassemanatarefa`
  ADD PRIMARY KEY (`RelDiasSemanaTarefaId`);

--
-- Índices para tabela `subcategorias`
--
ALTER TABLE `subcategorias`
  ADD PRIMARY KEY (`subcategoriasId`);

--
-- Índices para tabela `tarefaevento`
--
ALTER TABLE `tarefaevento`
  ADD PRIMARY KEY (`TarefaEventoId`);

--
-- Índices para tabela `tarefas`
--
ALTER TABLE `tarefas`
  ADD PRIMARY KEY (`TarefasId`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`UsuariosId`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `auxdiassemana`
--
ALTER TABLE `auxdiassemana`
  MODIFY `AuxDiasSemanaId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `auxprioridade`
--
ALTER TABLE `auxprioridade`
  MODIFY `auxPrioridadeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `auxtarefatipo`
--
ALTER TABLE `auxtarefatipo`
  MODIFY `auxtarefatipoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `categorias`
--
ALTER TABLE `categorias`
  MODIFY `CategoriasId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `reldiassemanatarefa`
--
ALTER TABLE `reldiassemanatarefa`
  MODIFY `RelDiasSemanaTarefaId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `subcategorias`
--
ALTER TABLE `subcategorias`
  MODIFY `subcategoriasId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tarefaevento`
--
ALTER TABLE `tarefaevento`
  MODIFY `TarefaEventoId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tarefas`
--
ALTER TABLE `tarefas`
  MODIFY `TarefasId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `UsuariosId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
