<?php

switch ($_SERVER["REQUEST_METHOD"]) {
    case 'GET':
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $result = $conn->query("SELECT * FROM relsubcattarefa,subcategorias where RelSubCatTarefaIdTarefa = ".$data["RelSubCatTarefaIdTarefa"]." and subcategoriasId = RelSubCatTarefaIdSubCat;");
        $conn->close();

        if ($result->num_rows > 0) {
            $res["data"]["tarefas"] = $result->fetch_all(MYSQLI_ASSOC);
        } else {
            $res["data"]["tarefas"] = array();
        }
        echo json_encode($res);
        die;
        break;
    case 'POST':
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $stmt = $conn->prepare("INSERT INTO relsubcattarefa VALUES (NULL, ?, ?, NOW());");
        $stmt->bind_param("ii", $data["RelSubCatTarefaIdSubCat"], $data["RelSubCatTarefaIdTarefa"]);
        $stmt->execute();
        $last_id = $conn->insert_id;

        if ($last_id > 0) {
            $res["cod"] = 200;
            $res["data"] = ["insert_id" => $last_id];
            array_push($res["msgs"], ["titulo" => "Adicionado"]);
        }
        $stmt->close();
        $conn->close();

        echo json_encode($res);
        die;
        break;
        case 'DELETE':
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);


            $stmt = $conn->prepare("DELETE FROM relsubcattarefa WHERE RelSubCatTarefaId = ?");
            $stmt->bind_param("i", $data["RelSubCatTarefaId"]);
            $stmt->execute();
            $affected_rows = $conn->affected_rows;

            if ($affected_rows > 0) {
                $res["cod"] = 200;
                $res["data"] = ["affected_rows" => $affected_rows];
                array_push($res["msgs"], ["titulo" => "Removido"]);
            }
            $stmt->close();
            $conn->close();

            echo json_encode($res);
            die;
            break;
}
?>