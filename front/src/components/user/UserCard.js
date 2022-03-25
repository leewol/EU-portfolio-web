import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";

import EmailForm from "./EmailForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./UserCard.css";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
    const [showEmailForm, setShowEmailForm] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShowEmailForm(false);

    function EmailHandler(event) {
        event.preventDefault();

        setShowEmailForm(true);
    }

    return (
        <div>
            <Card.Body className="usercard">
                <Row className="justify-content-md-center">
                    <img
                        style={{width: "10rem", height: "8rem"}}
                        className="usercard-img"
                        src={user?.image_url}
                        alt="불러오기 실패"
                    />
                </Row>
                <Card.Title className="usercard-name">{user?.name}</Card.Title>
                {!isNetwork ? (
                    <Card.Link className="usercard-email" href="#" onClick={EmailHandler}>
                        {user?.email}
                    </Card.Link>
                ) : (
                    <Card.Subtitle className="mb-2 text-muted usercard-email">
                        {user?.email}
                    </Card.Subtitle>
                )}
                <Card.Text className="usercard-description">{user?.description}</Card.Text>

                <EmailForm
                    userEmail={user?.email}
                    toName={user?.name}
                    handleClose={handleClose}
                    show={showEmailForm}
                />

                {isEditable && (
                    <Col>
                        <Row className="mt-3 text-center text-info">
                            <Col sm={{ span: 20 }}>
                                <Button
                                    variant="outline-info"
                                    size="sm"
                                    onClick={() => setIsEditing(true)}
                                >
                                    편집
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                )}

                {isNetwork && (
                    <Card.Link
                        className="mt-3"
                        href="#"
                        onClick={() => navigate(`/users/${user.id}`)}
                    >
                        포트폴리오
                    </Card.Link>
                )}
            </Card.Body>
        </div>
    );
}

export default UserCard;
