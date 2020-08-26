import { runSaga } from "redux-saga";
import Client from "../../client";
import * as actions from "../../actions";
import { fetchData, fetchNgrams, postPub, fetchDoiInfo } from "../../sagas";
import { iteratee } from "lodash";

describe("make getData request", () => {
  it("should call api and dispatch CHANGE_DATA action", async () => {
    const dummyPublications = [{ title: "test", author: "test-author" }];
    const getData = jest
      .spyOn(Client, "getData")
      .mockImplementation(() => Promise.resolve(dummyPublications));
    const dispatched = [];
    const result = await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      fetchData
    );

    expect(getData).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([actions.fetchData(dummyPublications)]);
    getData.mockClear();
  });
  it("should call api and dispatch CHANGE_ERROR action", async () => {
    const getData = jest
      .spyOn(Client, "getData")
      .mockImplementation(() => Promise.reject());
    const dispatched = [];
    const result = await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      fetchData
    );

    expect(getData).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      actions.changeError(
        "Could not connect to server.  Please refresh the page in a few minutes and try again."
      ),
    ]);
    getData.mockClear();
  });
});

describe("make getNgrams request", () => {
  it("should call api and dispatch CHANGE_NGRAMS action", async () => {
    const dummyNgrams = [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }];
    const getNgrams = jest
      .spyOn(Client, "getNgrams")
      .mockImplementation(() => Promise.resolve(dummyNgrams));
    const dispatched = [];
    const result = await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      fetchNgrams
    );

    expect(getNgrams).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([actions.fetchNgrams(dummyNgrams)]);
    getNgrams.mockClear();
  });
  it("should call api and dispatch CHANGE_ERROR action", async () => {
    const getNgrams = jest
      .spyOn(Client, "getNgrams")
      .mockImplementation(() => Promise.reject());
    const dispatched = [];
    const result = await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      fetchNgrams
    );

    expect(getNgrams).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      actions.changeError(
        "Could not connect to server.  Please refresh the page in a few minutes and try again."
      ),
    ]);
    getNgrams.mockClear();
  });
});
describe("make getDoiInfo request", () => {
  it("should call api and dispatch CHANGE_DOI_INFO action", async () => {
    const dummyDoiInfo = {
      data: { title: "test", author: "test-author", year: "2020" },
      status: "old",
    };
    const getDoiInfo = jest
      .spyOn(Client, "getDoiInfo")
      .mockImplementation(() => Promise.resolve(dummyDoiInfo));
    const dispatched = [];
    const result = await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      fetchDoiInfo,
      ["doi"]
    );

    expect(getDoiInfo).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([actions.fetchDoiInfo(dummyDoiInfo)]);
    getDoiInfo.mockClear();
  });
  it("should call api and dispatch CHANGE_DOI_FAILURE action", async () => {
    const dummyDoiInfo = { data: {}, status: "not found" };
    const getDoiInfo = jest
      .spyOn(Client, "getDoiInfo")
      .mockImplementation(() => Promise.resolve(dummyDoiInfo));
    const dispatched = [];
    const result = await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      fetchDoiInfo,
      ["doi"]
    );

    expect(getDoiInfo).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([actions.changeDoiFailure(true)]);
    getDoiInfo.mockClear();
  });
  it("should call api and dispatch CHANGE_ERROR action", async () => {
    const getDoiInfo = jest
      .spyOn(Client, "getDoiInfo")
      .mockImplementation(() => Promise.reject());
    const dispatched = [];
    const result = await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      fetchDoiInfo,
      ["doi"]
    );

    expect(getDoiInfo).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      actions.changeError(
        "Could not connect to server.  Please refresh the page in a few minutes and try again."
      ),
    ]);
    getDoiInfo.mockClear();
  });
});
describe("make postPub request", () => {
  it("should call api and dispatch CHANGE_DATA, CHANGE_NGRAMS, and CHANGE_ADD_SUCCESS action", async () => {
    const dummyPub = {
      newdata: JSON.stringify([{ title: "test", author: "test-author" }]),
      newngrams: JSON.stringify([
        { word: "cat", count: 4, freq: 33, pubs: "[117]" },
      ]),
    };
    const postPubDummy = jest
      .spyOn(Client, "postPub")
      .mockImplementation(() => Promise.resolve(dummyPub));
    const dispatched = [];
    const result = await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      postPub,
      [{ data: { title: "test1", author: "test-author" } }]
    );

    expect(postPubDummy).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(actions.fetchData(dummyPub["newdata"]));
    expect(dispatched[1]).toEqual(actions.fetchNgrams(dummyPub["newngrams"]));
    expect(dispatched[2]).toEqual(actions.changeAddSuccess(true));
    postPubDummy.mockClear();
  });
  it("should call api and dispatch CHANGE_ERROR action", async () => {
    const postPubDummy = jest
      .spyOn(Client, "postPub")
      .mockImplementation(() => Promise.reject(new Error('fail')));
    const dispatched = [];
    const result = await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      postPub,
      [{ data: { title: "test1", author: "test-author" } }]
    );

    expect(postPubDummy).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      actions.changeError(
        "Could not connect to server.  Please refresh the page in a few minutes and try again."
      ),
    ]);
    postPubDummy.mockClear();
  });
});
