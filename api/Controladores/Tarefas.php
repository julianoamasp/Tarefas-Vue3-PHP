<?php

switch ($_SERVER["REQUEST_METHOD"]) {
    case 'GET':

        $result = $conn->query("SELECT * FROM reldiassemanatarefa,tarefas,subcategorias,categorias,auxprioridade where RelDiasSemanaTarefaIdDia = " . $_GET["dia"] . " and RelDiasSemanaTarefaIdTarefa = tarefas.TarefasId and TarefasIdUsuario = " . $USUARIO["UsuariosId"] . " and TarefasStatus = 'A' and subcategoriasId = TarefasSubCatId and CategoriasId = subcategoriasIdCategoria and auxPrioridadeId = TarefasIdPrioridade;");

        //setar link de imagem
        if ($result->num_rows > 0) {
            $res["data"]["tarefas"] = $result->fetch_all(MYSQLI_ASSOC);

            for ($i = 0; $i < count($res["data"]["tarefas"]); $i++) {
                $dias = $conn->query("SELECT * FROM `reldiassemanatarefa` WHERE `RelDiasSemanaTarefaIdTarefa` = " . $res["data"]["tarefas"][$i]["TarefasId"]);
                $diasfetch = $dias->fetch_all(MYSQLI_ASSOC);
                $res["data"]["tarefas"][$i]["diasdasemana"] = $diasfetch;

                $dateExploded = explode(" ", $_GET["data"]);

                $eventos = $conn->query("SELECT * FROM tarefaevento where TarefaEventoIdUsuario = " . $USUARIO["UsuariosId"] . " and TarefaEventoIdTarefa = " . $res["data"]["tarefas"][$i]["TarefasId"] . " and TarefaEventoInicio > '" . $dateExploded[0] . "00:00:00" . "' and TarefaEventoTermino < '" . $dateExploded[0] . " 23:59:59' and TarefaEventoStatus = 'A';");
                $eventosfetch = $eventos->fetch_all(MYSQLI_ASSOC);

                if (count($eventosfetch) == 0) {
                    $conn->query("INSERT INTO tarefaevento VALUES (NULL, " . $USUARIO["UsuariosId"] . ", " . $res["data"]["tarefas"][$i]["TarefasId"] . ", NOW(), NOW(), '0', 'A');");
                    $eventos = $conn->query("SELECT * FROM tarefaevento where TarefaEventoIdUsuario = " . $USUARIO["UsuariosId"] . " and TarefaEventoIdTarefa = " . $res["data"]["tarefas"][$i]["TarefasId"] . " and TarefaEventoInicio > '" . $dateExploded[0] . "00:00:00" . "' and TarefaEventoTermino < '" . $dateExploded[0] . " 23:59:59' and TarefaEventoStatus = 'A';");
                    $eventosfetch = $eventos->fetch_all(MYSQLI_ASSOC);
                }
                $res["data"]["tarefas"][$i]["evento"] = $eventosfetch[0];
            }
        } else {
            $res["data"]["tarefas"] = array();
        }
        $conn->close();
        echo json_encode($res);
        die;
        break;





    case 'POST':
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $stmt = $conn->prepare("INSERT INTO tarefas VALUES (NULL,?,?,?,?,?,?,'" . $data["TarefasHtml"] . "',NOW(),'A');");
        $stmt->bind_param("iiiiss", $USUARIO["UsuariosId"], $data["TarefasSubCatId"], $data["TarefasIdTipo"], $data["TarefasIdPrioridade"], $data["TarefasNome"], $data["TarefasDescricao"]);
        $stmt->execute();
        $last_id = $conn->insert_id;

        if ($last_id > 0) {
            if (count($data["diasDaSemana"])) {
                for ($i = 0; $i < count($data["diasDaSemana"]); $i++) {
                    $stmt = $conn->prepare("INSERT INTO `reldiassemanatarefa` VALUES (NULL,?,?,?,?,NULL);");
                    $stmt->bind_param("iiii", $USUARIO["UsuariosId"], $data["diasDaSemana"][$i]["AuxDiasSemanaId"], $last_id, $data["diasDaSemana"][$i]["quantidadeMinutos"]);
                    $stmt->execute();
                }
            }
            array_push($res["msgs"], ["titulo" => "Tarefa adicionada", "msg" => "Tarefa \"" . $data["TarefasNome"] . "\" adicionada com sucesso!"]);
            $res["cod"] = 200;
            $res["data"] = ["insert_id" => $last_id];
        }
        $stmt->close();
        $conn->close();

        echo json_encode($res);
        die;
        break;





    case 'PUT':
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        if (isset($GETS[3])) {
            switch ($GETS[3]) {
                case 'cronometro':
                    //echo "UPDATE tarefaevento SET TarefaEventoTimestampQtde = " . $data["TarefaEventoTimestampQtde"] . " WHERE TarefaEventoId = " . $data["TarefaEventoId"] . " and TarefaEventoIdUsuario = " . $USUARIO["UsuariosId"] . " and TarefaEventoIdTarefa = " . $data["TarefaEventoIdTarefa"] . ";";
                    try {
                        $conn->query("UPDATE tarefaevento SET TarefaEventoTimestampQtde = " . $data["TarefaEventoTimestampQtde"] . " WHERE TarefaEventoId = " . $data["TarefaEventoId"] . " and TarefaEventoIdUsuario = " . $USUARIO["UsuariosId"] . " and TarefaEventoIdTarefa = " . $data["TarefaEventoIdTarefa"] . ";");
                        
                    } catch (\Throwable $th) {
                        echo $th;
                    }
                    
                    $affected_rows = $conn->affected_rows;

                    if ($affected_rows > 0) {
                        $res["cod"] = 200;
                        $res["data"] = ["affected_rows" => $affected_rows];
                        array_push($res["msgs"], ["titulo" => "Tarefa adicionada", "msg" => "Tempo da tarefa foi atualizada com sucesso!"]);
                    }
                    $conn->close();
                    echo json_encode($res);
                    break;
            }
            die;
        }

        $conn->query("UPDATE tarefaevento SET TarefaEventoTimestampQtde = " . $data["evento"]["TarefaEventoTimestampQtde"] . " WHERE TarefaEventoId = " . $data["evento"]["TarefaEventoId"] . " and TarefaEventoIdUsuario = " . $USUARIO["UsuariosId"] . " and TarefaEventoIdTarefa = " . $data["evento"]["TarefaEventoIdTarefa"] . ";");
        $stmt = $conn->prepare("UPDATE tarefas SET TarefasHtml = '" . $data["TarefasHtml"] . "' WHERE TarefasId = ? and TarefasIdUsuario = " . $USUARIO["UsuariosId"] . ";");
        $stmt->bind_param("i", $data["TarefasId"]);
        $stmt->execute();
        $affected_rows = $conn->affected_rows;

        if ($affected_rows > 0) {
            $res["cod"] = 200;
            $res["data"] = ["affected_rows" => $affected_rows];
            array_push($res["msgs"], ["titulo" => "Tarefa adicionada", "msg" => "Tarefa \"" . $data["TarefasNome"] . "\" atualizada com sucesso!"]);
        }
        $stmt->close();
        $conn->close();

        echo json_encode($res);
        die;
        break;



    case 'DELETE':
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);


        $stmt = $conn->prepare("UPDATE tarefas SET TarefasStatus = 'E' WHERE TarefasId = ? and TarefasIdUsuario = " . $USUARIO["UsuariosId"] . ";");
        $stmt->bind_param("i", $_GET["TarefasId"]);
        $stmt->execute();
        $affected_rows = $conn->affected_rows;

        if ($affected_rows > 0) {
            $res["cod"] = 200;
            $res["data"] = ["affected_rows" => $affected_rows];
            array_push($res["msgs"], ["titulo" => "Removido", "msg" => "Removido com sucesso!"]);
        }
        $stmt->close();
        $conn->close();

        echo json_encode($res);
        die;
        break;
}
