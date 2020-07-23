import reducer from "../../reducer";
import * as selectors from "../../reducer";
import Immutable from "seamless-immutable";

let initialstate = Immutable({
  publications: [],
  ngrams: [],
  loading: true,
  selectWord: null,
  selectYear: null,
  error: null,
  doiInfo: { data: {}, status: "empty" },
  keycloak: { keycloak: null, authenticated: null, iscis: null, profile: null },
  doiFailure: false,
  addSuccess: false,
  pressed: false,
});
let getData = jest.fn();

describe("reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialstate);
  });

  it("should handle CHANGE_DATA", () => {
    expect(
      reducer(initialstate, {
        type: "CHANGE_DATA",
        data: [{ title: "test", author: "Maura" }],
      })
    ).toEqual({
      publications: [{ title: "test", author: "Maura" }],
      ngrams: [],
      loading: true,
      selectWord: null,
      selectYear: null,
      error: null,
      doiInfo: { data: {}, status: "empty" },
      keycloak: {
        keycloak: null,
        authenticated: null,
        iscis: null,
        profile: null,
      },
      doiFailure: false,
      addSuccess: false,
      pressed: false,
    });
  });
  it("should handle CHANGE_NGRAMS", () => {
    expect(
      reducer(
        Immutable({
          publications: [{ title: "test", author: "Maura" }],
          ngrams: [],
          loading: true,
          selectWord: null,
          selectYear: null,
          error: null,
          doiInfo: { data: {}, status: "empty" },
          keycloak: {
            keycloak: null,
            authenticated: null,
            iscis: null,
            profile: null,
          },
          doiFailure: false,
          addSuccess: false,
          pressed: false,
        }),
        {
          type: "CHANGE_NGRAMS",
          data: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
        }
      )
    ).toEqual({
      publications: [{ title: "test", author: "Maura" }],
      ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
      loading: false,
      selectWord: null,
      selectYear: null,
      error: null,
      doiInfo: { data: {}, status: "empty" },
      keycloak: {
        keycloak: null,
        authenticated: null,
        iscis: null,
        profile: null,
      },
      doiFailure: false,
      addSuccess: false,
      pressed: false,
    });
  });

  it("should handle CHANGE_ERROR", () => {
    expect(
      reducer(
        Immutable({
          publications: [{ title: "test", author: "Maura" }],
          ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
          loading: true,
          selectWord: null,
          selectYear: null,
          error: null,
          doiInfo: { data: {}, status: "empty" },
          keycloak: {
            keycloak: null,
            authenticated: null,
            iscis: null,
            profile: null,
          },
          doiFailure: false,
          addSuccess: false,
          pressed: false,
        }),
        {
          type: "CHANGE_ERROR",
          data: "Something went wrong",
        }
      )
    ).toEqual({
      publications: [{ title: "test", author: "Maura" }],
      ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
      loading: false,
      selectWord: null,
      selectYear: null,
      error: "Something went wrong",
      doiInfo: { data: {}, status: "empty" },
      keycloak: {
        keycloak: null,
        authenticated: null,
        iscis: null,
        profile: null,
      },
      doiFailure: false,
      addSuccess: false,
      pressed: false,
    });
  });

  it("should handle CHANGE_LOADING", () => {
    expect(
      reducer(
        Immutable({
          publications: [{ title: "test", author: "Maura" }],
          ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
          loading: true,
          selectWord: null,
          selectYear: null,
          error: "Something went wrong",
          doiInfo: { data: {}, status: "empty" },
          keycloak: {
            keycloak: null,
            authenticated: null,
            iscis: null,
            profile: null,
          },
          doiFailure: false,
          addSuccess: false,
          pressed: false,
        }),
        {
          type: "CHANGE_LOADING",
          data: false,
        }
      )
    ).toEqual({
      publications: [{ title: "test", author: "Maura" }],
      ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
      loading: false,
      selectWord: null,
      selectYear: null,
      error: "Something went wrong",
      doiInfo: { data: {}, status: "empty" },
      keycloak: {
        keycloak: null,
        authenticated: null,
        iscis: null,
        profile: null,
      },
      doiFailure: false,
      addSuccess: false,
      pressed: false,
    });
  });

  it("should handle CHANGE_SELECT_WORD", () => {
    expect(
      reducer(
        Immutable({
          publications: [{ title: "test", author: "Maura" }],
          ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
          loading: false,
          selectWord: null,
          selectYear: null,
          error: "Something went wrong",
          doiInfo: { data: {}, status: "empty" },
          keycloak: {
            keycloak: null,
            authenticated: null,
            iscis: null,
            profile: null,
          },
          doiFailure: false,
          addSuccess: false,
          pressed: false,
        }),
        {
          type: "CHANGE_SELECT_WORD",
          data: "test",
        }
      )
    ).toEqual({
      publications: [{ title: "test", author: "Maura" }],
      ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
      loading: false,
      selectWord: "test",
      selectYear: null,
      error: "Something went wrong",
      doiInfo: { data: {}, status: "empty" },
      keycloak: {
        keycloak: null,
        authenticated: null,
        iscis: null,
        profile: null,
      },
      doiFailure: false,
      addSuccess: false,
      pressed: false,
    });
  });

  it("should handle CHANGE_SELECT_YEAR", () => {
    expect(
      reducer(
        Immutable({
          publications: [{ title: "test", author: "Maura" }],
          ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
          loading: false,
          selectWord: "test",
          selectYear: null,
          error: "Something went wrong",
          doiInfo: { data: {}, status: "empty" },
          keycloak: {
            keycloak: null,
            authenticated: null,
            iscis: null,
            profile: null,
          },
          doiFailure: false,
          addSuccess: false,
          pressed: false,
        }),
        {
          type: "CHANGE_SELECT_YEAR",
          data: 2015,
        }
      )
    ).toEqual({
      publications: [{ title: "test", author: "Maura" }],
      ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
      loading: false,
      selectWord: "test",
      selectYear: 2015,
      error: "Something went wrong",
      doiInfo: { data: {}, status: "empty" },
      keycloak: {
        keycloak: null,
        authenticated: null,
        iscis: null,
        profile: null,
      },
      doiFailure: false,
      addSuccess: false,
      pressed: false,
    });
  });

  it("should handle CHANGE_DOI_INFO", () => {
    expect(
      reducer(
        Immutable({
          publications: [{ title: "test", author: "Maura" }],
          ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
          loading: false,
          selectWord: "test",
          selectYear: 2015,
          error: "Something went wrong",
          doiInfo: { data: {}, status: "empty" },
          keycloak: {
            keycloak: null,
            authenticated: null,
            iscis: null,
            profile: null,
          },
          doiFailure: false,
          addSuccess: false,
          pressed: false,
        }),
        {
          type: "CHANGE_DOI_INFO",
          data: { data: { title: "testing-123", author: "me" }, status: "old" },
        }
      )
    ).toEqual({
      publications: [{ title: "test", author: "Maura" }],
      ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
      loading: false,
      selectWord: "test",
      selectYear: 2015,
      error: "Something went wrong",
      doiInfo: { data: { title: "testing-123", author: "me" }, status: "old" },
      keycloak: {
        keycloak: null,
        authenticated: null,
        iscis: null,
        profile: null,
      },
      doiFailure: false,
      addSuccess: false,
      pressed: false,
    });
  });

  it("should handle UPDATE_DOI_INFO", () => {
    expect(
      reducer(
        Immutable({
          publications: [{ title: "test", author: "Maura" }],
          ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
          loading: false,
          selectWord: "test",
          selectYear: 2015,
          error: "Something went wrong",
          doiInfo: { data: {}, status: "empty" },
          keycloak: {
            keycloak: null,
            authenticated: null,
            iscis: null,
            profile: null,
          },
          doiFailure: false,
          addSuccess: false,
          pressed: false,
        }),
        {
          type: "UPDATE_DOI_INFO",
          data: {
            data: { title: "testing-1234", author: "me2" },
            status: "old",
          },
        }
      )
    ).toEqual({
      publications: [{ title: "test", author: "Maura" }],
      ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
      loading: false,
      selectWord: "test",
      selectYear: 2015,
      error: "Something went wrong",
      doiInfo: {
        data: { title: "testing-1234", author: "me2" },
        status: "old",
      },
      keycloak: {
        keycloak: null,
        authenticated: null,
        iscis: null,
        profile: null,
      },
      doiFailure: false,
      addSuccess: false,
      pressed: false,
    });
  });
  it("should handle UPDATE_KEYCLOAK", () => {
    expect(
      reducer(
        Immutable({
          publications: [{ title: "test", author: "Maura" }],
          ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
          loading: false,
          selectWord: "test",
          selectYear: 2015,
          error: "Something went wrong",
          doiInfo: {
            data: { title: "testing-1234", author: "me2" },
            status: "old",
          },
          keycloak: {
            keycloak: null,
            authenticated: null,
            iscis: null,
            profile: null,
          },
          doiFailure: false,
          addSuccess: false,
          pressed: false,
        }),
        {
          type: "UPDATE_KEYCLOAK",
          data: {
            keycloak: "keycloak",
            authenticated: true,
            iscis: true,
            profile: "abc123",
          },
        }
      )
    ).toEqual({
      publications: [{ title: "test", author: "Maura" }],
      ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
      loading: false,
      selectWord: "test",
      selectYear: 2015,
      error: "Something went wrong",
      doiInfo: {
        data: { title: "testing-1234", author: "me2" },
        status: "old",
      },
      keycloak: {
        keycloak: "keycloak",
        authenticated: true,
        iscis: true,
        profile: "abc123",
      },
      doiFailure: false,
      addSuccess: false,
      pressed: false,
    });
  });

  it("should handle FETCH_DOI_FAILURE", () => {
    expect(
      reducer(
        Immutable({
          publications: [{ title: "test", author: "Maura" }],
          ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
          loading: false,
          selectWord: "test",
          selectYear: 2015,
          error: "Something went wrong",
          doiInfo: {
            data: { title: "testing-1234", author: "me2" },
            status: "old",
          },
          keycloak: {
            keycloak: "keycloak",
            authenticated: true,
            iscis: true,
            profile: "abc123",
          },
          doiFailure: false,
          addSuccess: false,
          pressed: false,
        }),
        {
          type: "FETCH_DOI_FAILURE",
          data: true,
        }
      )
    ).toEqual({
      publications: [{ title: "test", author: "Maura" }],
      ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
      loading: false,
      selectWord: "test",
      selectYear: 2015,
      error: "Something went wrong",
      doiInfo: {
        data: { title: "testing-1234", author: "me2" },
        status: "old",
      },
      keycloak: {
        keycloak: "keycloak",
        authenticated: true,
        iscis: true,
        profile: "abc123",
      },
      doiFailure: true,
      addSuccess: false,
      pressed: false,
    });
  });

  it("should handle UPDATE_ADD_SUCCESS", () => {
    expect(
      reducer(
        Immutable({
          publications: [{ title: "test", author: "Maura" }],
          ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
          loading: false,
          selectWord: "test",
          selectYear: 2015,
          error: "Something went wrong",
          doiInfo: {
            data: { title: "testing-1234", author: "me2" },
            status: "old",
          },
          keycloak: {
            keycloak: "keycloak",
            authenticated: true,
            iscis: true,
            profile: "abc123",
          },
          doiFailure: true,
          addSuccess: false,
          pressed: false,
        }),
        {
          type: "UPDATE_ADD_SUCCESS",
          data: true,
        }
      )
    ).toEqual({
      publications: [{ title: "test", author: "Maura" }],
      ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
      loading: false,
      selectWord: "test",
      selectYear: 2015,
      error: "Something went wrong",
      doiInfo: {
        data: { title: "testing-1234", author: "me2" },
        status: "old",
      },
      keycloak: {
        keycloak: "keycloak",
        authenticated: true,
        iscis: true,
        profile: "abc123",
      },
      doiFailure: true,
      addSuccess: true,
      pressed: false,
    });
  });

  it("should handle UPDATE_PRESSED", () => {
    expect(
      reducer(
        Immutable({
          publications: [{ title: "test", author: "Maura" }],
          ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
          loading: false,
          selectWord: "test",
          selectYear: 2015,
          error: "Something went wrong",
          doiInfo: {
            data: { title: "testing-1234", author: "me2" },
            status: "old",
          },
          keycloak: {
            keycloak: "keycloak",
            authenticated: true,
            iscis: true,
            profile: "abc123",
          },
          doiFailure: true,
          addSuccess: true,
          pressed: false,
        }),
        {
          type: "UPDATE_PRESSED",
          data: true,
        }
      )
    ).toEqual({
      publications: [{ title: "test", author: "Maura" }],
      ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
      loading: false,
      selectWord: "test",
      selectYear: 2015,
      error: "Something went wrong",
      doiInfo: {
        data: { title: "testing-1234", author: "me2" },
        status: "old",
      },
      keycloak: {
        keycloak: "keycloak",
        authenticated: true,
        iscis: true,
        profile: "abc123",
      },
      doiFailure: true,
      addSuccess: true,
      pressed: true,
    });
  });

  let fullState = {
    publications: [{ title: "test", author: "Maura" }],
    ngrams: [{ word: "cat", count: 4, freq: 33, pubs: "[117]" }],
    loading: false,
    selectWord: "test",
    selectYear: 2015,
    error: "Something went wrong",
    doiInfo: { data: { title: "testing-1234", author: "me2" }, status: "old" },
    keycloak: {
      keycloak: "keycloak",
      authenticated: true,
      iscis: true,
      profile: "abc123",
    },
    doiFailure: true,
    addSuccess: true,
    pressed: true,
    manual: true,
  };

  describe("selectors", () => {
    it("should select data from state", () => {
      const state = fullState;
      expect(selectors.getData(state)).toStrictEqual([
        { title: "test", author: "Maura" },
      ]);
    });
    it("should select ngrams from state", () => {
      const state = fullState;
      expect(selectors.getNgrams(state)).toStrictEqual([
        { word: "cat", count: 4, freq: 33, pubs: "[117]" },
      ]);
    });
    it("should select loading from state", () => {
      const state = fullState;
      expect(selectors.getLoading(state)).toBe(false);
    });
    it("should select selectWord from state", () => {
      const state = fullState;
      expect(selectors.getSelectWord(state)).toBe("test");
    });
    it("should select selectYear from state", () => {
      const state = fullState;
      expect(selectors.getSelectYear(state)).toBe(2015);
    });
    it("should select error from state", () => {
      const state = fullState;
      expect(selectors.getError(state)).toBe("Something went wrong");
    });
    it("should select doiInfo from state", () => {
      const state = fullState;
      expect(selectors.getDoiInfo(state)).toStrictEqual({
        data: { title: "testing-1234", author: "me2" },
        status: "old",
      });
    });
    it("should select keycloak from state", () => {
      const state = fullState;
      expect(selectors.getKeycloak(state)).toStrictEqual({
        keycloak: "keycloak",
        authenticated: true,
        iscis: true,
        profile: "abc123",
      });
    });
    it("should select doiFailure from state", () => {
      const state = fullState;
      expect(selectors.getDoiFailure(state)).toBe(true);
    });
    it("should select addSuccess from state", () => {
      const state = fullState;
      expect(selectors.getAddSuccess(state)).toBe(true);
    });
    it("should select pressed from state", () => {
      const state = fullState;
      expect(selectors.getPressed(state)).toBe(true);
    });
  });
});
