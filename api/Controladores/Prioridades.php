<?php

switch ($_SERVER["REQUEST_METHOD"]) {
    case 'GET':
        $result = $conn->query("SELECT * FROM auxprioridade;");
        if ($result->num_rows > 0) {
            $res["cod"] = 200;
            $res["data"]["prioridades"] = $result->fetch_all(MYSQLI_ASSOC);
        } else {
            $res["cod"] = 200;
            $res["data"]["prioridades"] = array();
        }
        $conn->close();
        echo json_encode($res);
        die;
        break;
}
