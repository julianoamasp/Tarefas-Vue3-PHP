<?php

switch ($_SERVER["REQUEST_METHOD"]) {

    case 'POST':
        switch ($GETS[3]) {
            case 'entrar':
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);
                $Ok = true;
                if ($data["UsuariosEmail"] == "" || $data["UsuariosSenha"] == "" || strlen($data["UsuariosSenha"]) < 8) {
                    $Ok = false;
                    if ($data["UsuariosSenha"] == "") array_push($res["msgs"], ["titulo" => "Nescessário campo", "msg" => "O campo Senha é obrigatório!"]);
                    if ($data["UsuariosEmail"] == "") array_push($res["msgs"], ["titulo" => "Nescessário campo", "msg" => "O campo Email é obrigatório!"]);
                    if (strlen($data["UsuariosSenha"]) < 8) array_push($res["msgs"], ["titulo" => "Nescessário campo", "msg" => "Senha deve conter 8 digitos!"]);
                }

                if ($Ok == true) {
                    $senhaMd5 = md5($data["UsuariosSenha"]);
                    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE UsuariosEmail = ? AND UsuariosSenha = ? AND UsuariosStatus = 'A'");
                    $stmt->bind_param("ss", $data["UsuariosEmail"], $senhaMd5);
                    $stmt->execute();

                    $bdRes = fetch_quaquer_statement($stmt);

                    if (count($bdRes) > 0) {

                        $token = base64_encode(date("Ymdhms") . $bdRes[0]["UsuariosNome"] . $bdRes[0]["UsuariosEmail"] . uniqid());

                        $stmtUp = $conn->prepare("UPDATE usuarios SET UsuariosToken = ? WHERE UsuariosId = ?;");
                        $stmtUp->bind_param("si", $token, $bdRes[0]["UsuariosId"]);
                        $stmtUp->execute();
                        $affected_rows = $conn->affected_rows;

                        if ($affected_rows) {
                            $res["cod"] = 200;
                            $res["data"] = [
                                "UsuariosNome" => $bdRes[0]["UsuariosNome"],
                                "UsuariosEmail" => $bdRes[0]["UsuariosEmail"],
                                "UsuariosToken" => $token
                            ];
                            $res["msgs"] = [["titulo" => "Login", "msg" => "Login efetuado com sucesso!"]];
                        } else {
                            $res["cod"] = 403;
                            $res["msgs"] = [["titulo" => "Login", "msg" => "Algo de errado não está certo, tente novamente mais tarde!"]];
                        }
                    } else {
                        $res["cod"] = 403;
                        $res["msgs"] = [["titulo" => "Login", "msg" => "Usuário não encontrado!"]];
                    }

                    $stmt->close();
                    $conn->close();
                }

                echo json_encode($res);
                break;





            case 'logado':
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);

                $stmt = $conn->prepare("SELECT * FROM usuarios WHERE UsuariosEmail = ? AND UsuariosToken = ? AND UsuariosStatus = 'A'");
                $stmt->bind_param("ss", $data["UsuariosEmail"], $data["UsuariosToken"]);
                $stmt->execute();

                $bdRes = fetch_quaquer_statement($stmt);

                if (count($bdRes) > 0) {

                    $res["cod"] = 200;
                    $res["data"] = [
                        "UsuariosNome" => $bdRes[0]["UsuariosNome"],
                        "UsuariosEmail" => $bdRes[0]["UsuariosEmail"],
                        "UsuariosToken" => $bdRes[0]["UsuariosToken"]
                    ];
                    $res["msgs"] = [["titulo" => "Login", "msg" => "Usuário logado!"]];
                } else {
                    $res["msgs"] = [["titulo" => "Login", "msg" => "Usuário não encontrado!"]];
                }

                $stmt->close();
                $conn->close();

                echo json_encode($res);
                break;




            case 'cadastro':
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);

                $Ok = true;
                if ($data["UsuariosNome"] == "" || $data["UsuariosSenha"] == "" || $data["UsuariosEmail"] == "" || strlen($data["UsuariosSenha"]) < 8) {
                    $Ok = false;
                    if ($data["UsuariosNome"] == "") array_push($res["msgs"], ["titulo" => "Nescessário campo", "msg" => "O campo Nome é obrigatório!"]);
                    if ($data["UsuariosSenha"] == "") array_push($res["msgs"], ["titulo" => "Nescessário campo", "msg" => "O campo Senha é obrigatório!"]);
                    if ($data["UsuariosEmail"] == "") array_push($res["msgs"], ["titulo" => "Nescessário campo", "msg" => "O campo Email é obrigatório!"]);
                    if (strlen($data["UsuariosSenha"]) < 8) array_push($res["msgs"], ["titulo" => "Quantidade insuficiente", "msg" => "O campo necessita de no minomo 8 caracteres!"]);
                }

                if ($Ok == true) {
                    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE UsuariosEmail = ? AND UsuariosStatus = 'A'");
                    $stmt->bind_param("s", $data["UsuariosEmail"]);
                    $stmt->execute();
                    $bdRes = fetch_quaquer_statement($stmt);

                    if (count($bdRes) == 0) {
                        $senhaMd5 = md5($data["UsuariosSenha"]);
                        $stmt = $conn->prepare("INSERT INTO usuarios VALUES (NULL, ?,?,?, NULL, NOW(), 'A');");
                        $stmt->bind_param("sss", $data["UsuariosNome"], $senhaMd5, $data["UsuariosEmail"]);
                        $stmt->execute();
                        $last_id = $conn->insert_id;

                        if ($last_id > 0) {
                            $res["cod"] = 200;
                            $res["msgs"] = [["titulo" => "Login", "msg" => "Usuário " . $data["UsuariosNome"] . " cadastrado com sucesso!"]];
                        } else {
                            $res["msgs"] = [["titulo" => "Login", "msg" => "Algo de errado não está certo, tente novamente mais tarde!"]];
                        }
                    } else {
                        $res["msgs"] = [["titulo" => "Login", "msg" => "Email " . $data["UsuariosEmail"] . " já cadastrado!"]];
                    }

                    $stmt->close();
                    $conn->close();
                }

                echo json_encode($res);
                break;
        }
        die;
        break;
}
