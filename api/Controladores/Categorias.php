<?php

switch ($_SERVER["REQUEST_METHOD"]) {
    
    
    case 'GET':
        $result = $conn->query("SELECT * FROM categorias where CategoriasIdUsuario = ".$USUARIO["UsuariosId"]." and CategoriasStatus = 'A';");
        $res["cod"] = 200;
        $res["data"]["categorias"] = $result->fetch_all(MYSQLI_ASSOC);
        if ($result->num_rows > 0) {
            for ($i=0; $i < count($res["data"]["categorias"]); $i++) { 
                $subcategorias = $conn->query("SELECT * FROM subcategorias WHERE subcategoriasIdUsuario = ".$USUARIO["UsuariosId"]."  and subcategoriasIdCategoria = ".$res["data"]["categorias"][$i]["CategoriasId"]." AND subcategoriasStatus = 'A';");
                if ($subcategorias->num_rows > 0) {
                    $res["data"]["categorias"][$i]["subcategorias"] = $subcategorias->fetch_all(MYSQLI_ASSOC);
                }else{
                    $res["data"]["categorias"][$i]["subcategorias"] = array();
                }
            }
        } else {
            $res["cod"] = 200;
            $res["data"]["categorias"] = array();
        }
        $conn->close();
        echo json_encode($res);
        die;
        break;





    case 'POST':
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $stmt = $conn->prepare("INSERT INTO categorias VALUES (NULL, ".$USUARIO["UsuariosId"].", ?,?, NOW(), 'A');");
        $stmt->bind_param("ss", $data["CategoriasNome"], $data["CategoriasDescricao"]);
        $stmt->execute();
        $last_id = $conn->insert_id;

        if ($last_id > 0) {
            $res["cod"] = 200;
            $res["data"] = ["insert_id" => $last_id];
            $res["msgs"] = [["titulo" => "Categoria adicionada", "msg" => "Categoria ".$data["CategoriasNome"]." adicionada com sucesso!"]];
        }
        $stmt->close();
        $conn->close();

        echo json_encode($res);
        die;
        break;




    case 'PUT':
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $stmt = $conn->prepare("UPDATE categorias SET CategoriasNome = ?, CategoriasDescricao = ? WHERE CategoriasId = ?;");
        $stmt->bind_param("ssi", $data["CategoriasNome"], $data["CategoriasDescricao"], $data["CategoriasId"]);
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
        break;





    case 'DELETE':
        $stmt = $conn->prepare("UPDATE categorias SET CategoriasStatus = 'E' WHERE CategoriasId = ? and CategoriasIdUsuario = ".$USUARIO["UsuariosId"].";");
        $stmt->bind_param("i", $_GET["CategoriasId"]);
        $stmt->execute();
        $affected_rows = $conn->affected_rows;

        if ($affected_rows > 0) {
            $res["cod"] = 200;
            $res["data"] = ["affected_rows" => $affected_rows];
            $res["msgs"] = [["titulo" => "Categoria removida", "msg" => "Categoria removida com sucesso!"]];
        }
        $stmt->close();
        $conn->close();

        echo json_encode($res);
        die;
        break;
}
