<?php

switch ($_SERVER["REQUEST_METHOD"]) {
    case 'GET':
        $result = $conn->query("SELECT * FROM subcategorias WHERE subcategoriasIdCategoria = ". $_GET["idcatregoria"]." AND subcategoriasStatus = 'A';");
        if ($result->num_rows > 0) {
            $res["cod"] = 200;
            $res["data"]["subcategorias"] = $result->fetch_all(MYSQLI_ASSOC);
        } else {
            $res["cod"] = 200;
            $res["data"]["subcategorias"] = array();
        }
        $conn->close();
        echo json_encode($res);
        die;
        break;
    case 'POST':
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);


        $stmt = $conn->prepare("INSERT INTO subcategorias  VALUES (NULL, ". $USUARIO["UsuariosId"].",?, ?, NOW(), 'A');");
        $stmt->bind_param("ss", $data["subcategoriasIdCategoria"],$data["subcategoriasNome"]);
        $stmt->execute();
        $last_id = $conn->insert_id;

        if ($last_id > 0) {
            $res["cod"] = 200;
            $res["data"] = ["insert_id" => $last_id];
            $res["msgs"] = [["titulo" => "Categoria removida", "msg" => "SubCategoria \"".$data["subcategoriasNome"]."\" adicionada com sucesso!"]];
        }
        $stmt->close();
        $conn->close();

        echo json_encode($res);
        die;
        break;/*
    case 'PUT':
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);


        $stmt = $conn->prepare("UPDATE subcategorias SET subcategoriasNome = ? WHERE subcategoriasId = ?");
        $stmt->bind_param("si", $data["subcategoriasNome"], $data["subcategoriasId"]);
        $stmt->execute();
        $affected_rows = $conn->affected_rows;

        if ($affected_rows > 0) {
            $res["cod"] = 200;
            $res["data"] = ["affected_rows" => $affected_rows];
            array_push($res["msgs"], ["titulo" => "Atualizado"]);
        }
        $stmt->close();
        $conn->close();

        echo json_encode($res);
        die;
        break;*/
        case 'DELETE':
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);

            $stmt = $conn->prepare("UPDATE subcategorias SET subcategoriasStatus = 'E' WHERE subcategoriasId = ? and subcategoriasIdUsuario = ". $USUARIO["UsuariosId"].";");
            $stmt->bind_param("i", $_GET["subcategoriasId"]);
            $stmt->execute();
            $affected_rows = $conn->affected_rows;

            if ($affected_rows > 0) {
                $res["cod"] = 200;
                $res["data"] = ["affected_rows" => $affected_rows];
                $res["msgs"] = [["titulo" => "Categoria removida", "msg" => "SubCategoria removida com sucesso!"]];
            }
            $stmt->close();
            $conn->close();

            echo json_encode($res);
            die;
            break;
}
