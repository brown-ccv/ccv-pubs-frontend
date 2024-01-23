import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
// import Spinner from "./Spinner";
import { PubsTable } from "./PubsTable";
// import YearChart from "./YearChart";
// import WordCloud from "./WordCloud";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicationsData } from "../utils/firebase.ts";
import { selectPublications, setPublications } from "../store/slice/appState";

export function ContentPage() {
  const publications = useSelector(selectPublications)
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetch() {
      dispatch(setPublications(await fetchPublicationsData()))
    }
      fetch()
    },
    [dispatch]
  )

  return (
    <div className="ContentPage main-content">
      <div align="right">
        <Link to="/addpub">
          <Button variant="contained" color="primary" id="AddPubButton">
            Add a Publication
          </Button>
        </Link>
      </div>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <div className="pub-title pt-2 bg-primary text-white rounded-circle">
          <FontAwesomeIcon icon={faBook} />
        </div>
        <h1 className="pl-2">Publications</h1>
      </div>

      {/* TODO: Error Boundary */}
      {/* TODO: Put back in suspense component */}
      {/*<Spinner loading={this.props.loading} className="spinner" size={100} />*/}

      <div id="main-content">
        <div className="PubsTable-CP">
          <PubsTable publications={publications} />
        </div>

        {/* TODO: Word Cloud */}
        {/* TODO: Year Chart */}
        {/*<h3 className="word-cloud-title pt-4 mt-4">*/}
        {/*  {" "}*/}
        {/*  What are these publications all about?{" "}*/}
        {/*</h3>*/}
        {/*<div className="viz d-flex justify-content-center pt-5">*/}
        {/*  <WordCloud />*/}
        {/*  <YearChart />*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
