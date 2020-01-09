import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import Layout from "../../components/admin/Layout";

import { Card, Container } from "semantic-ui-react";

function Dashboard() {
  return (
    <Layout>
      <div className="dashboard-container">
        <Container fluid>
          <Card.Group style={{ marginBottom: "20px" }}>
            <Card>
              <Card.Content>
                <Card.Header>Members</Card.Header>
                <Card.Meta>200</Card.Meta>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Card.Header>Members</Card.Header>
                <Card.Meta>200</Card.Meta>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Card.Header>Members</Card.Header>
                <Card.Meta>200</Card.Meta>
              </Card.Content>
            </Card>
          </Card.Group>
        </Container>
        <div className="container-content">Hello</div>
      </div>
    </Layout>
  );
}

export default Dashboard;
