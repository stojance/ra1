import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Col,
  Container,
  Input,
  Row,
  Media,
  Form,
  Button,
} from "reactstrap";
import DataPager from "../DataPager/data-pager";
import MySpinner from "./../MySpinner/MySpinner";
import './GitHubUsers.css'

export default function GitHubUsers(props) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const pageSize = 8;

  useEffect(() => {
    getDataAsync();
  }, []);

  const getData = () => {
    if (searchTerm) {
      setIsLoading(true);
      axios
        .get(`https://api.github.com/search/users?q=${searchTerm}`)
        .then((res) => {
          setData(res.data.items);
          setCurrentPage(0);
          setList(res.data.items.slice(0, pageSize));
          setIsLoading(false);
        });
    }
  };

  const getDataAsync = async () => {
    if (searchTerm) {
      setIsLoading(true);
      const res = await axios.get(
        `https://api.github.com/search/users?q=${searchTerm}`
      );
      setData(res.data.items);
      setCurrentPage(0);
      setList(res.data.items.slice(0, pageSize));
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getDataAsync();
  };

  const handlePageClick = (slice_items, newCurrentPage) => {
    setList(slice_items);
    setCurrentPage(newCurrentPage);
  };

  const handleSearchClick = (event) => {
    setSearchTerm(event.target.value);
    setData([]);
    setList([]);
  };

  const listUsers = list.map((user) => {
    return (
      <Media key={user.id} className="m-1 git-hub" href={user.html_url} target="_blanc">
        <Media left>
          <Media
            object
            width={64}
            height={64}
            className="mr-3"
            src={user.avatar_url}
            alt="image"
          />
        </Media>
        <Media body>
          <Media heading>{user.login}</Media>
          {user.id}
        </Media>
      </Media>
    );
  });

  return (
    <Container className="mt-2 pt-2">
      <Row className="mb-1">
        <Col>
          <Form onSubmit={handleSubmit} inline>
            <Input
              type="text"
              placeholder="Search term"
              value={searchTerm}
              onChange={handleSearchClick}
              onFocus={event => event.target.select()}
            />
            <Button type="submit">Search</Button>
            {isLoading && <MySpinner />}
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          {isLoading && <MySpinner />}
          {!isLoading && listUsers}
        </Col>
      </Row>
      <Row>
        <Col>
          <DataPager
            data={data}
            onPageClick={handlePageClick}
            currentPage={currentPage}
            pageSize={pageSize}
          ></DataPager>
        </Col>
      </Row>
    </Container>
  );
}
