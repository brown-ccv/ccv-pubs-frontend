//import fetch as _fetchmock from 'isomorphic-fetch';
import Client from "../client";
require('jest-fetch-mock').enableMocks()
//require('isomorphic-fetch');
const fetchMock = require("fetch-mock");
const _fetchMock = fetchMock.sandbox()

describe("getData", () => {
	// resets your mocks so tests don't bleed into each other
	beforeEach(() => {
        _fetchMock.restore()
        _fetchMock.reset()
	});
	
	// it("is true on server success",  async () => {
    //     fetch.mockResponseOnce({ data: '12345' });
    //      Client.getData().then(res => {
    //         console.log(res.data)
    //         expect(res.data).toEqual('12345')
    //       }).catch(error => console.log(error))
    //       console.log(fetch.mock.calls)
    //     //   expect(fetch.mock.calls.length).toEqual(1)
    //     //   expect(fetch.mock.calls[0][0]).toEqual('http://localhost:8080/publications')
    // });

    it("is true on server success", async () => {
		_fetchMock.mock("http://localhost:8080/publications", {
            type: "cors", 
            url: "http://localhost:8080/publications", 
            redirected: false, 
            status: 200, 
            ok: true,
            bodyUsed: true,
            body: {success: true}
		});
		
		expect(await Client.getData()).toEqual(expect.anything());
    });
    
    it('can fetch', async () => {

        fetchMock.get("http://localhost:8080/publications", {
            name: 'route',
            matcher: "http://localhost:8080/publications",
            method: 'GET',
            credentials: 'same-origin',
            response: {
              status: 200,
              body: []
            }
          });
    
        const response = await Client.getData();
        const result = await response.json();
    
        expect(result.hello).toEqual("world");
      });
    
    // it('calls google and returns data to me', () => {
    //     fetch.mockResponseOnce(JSON.stringify({ data: '12345' }))
     
    //     //assert on the response
    //     APIRequest('google').then(res => {
    //       expect(res.data).toEqual('12345')
    //     })
     
    //     //assert on the times called and arguments given to fetch
    //     expect(fetch.mock.calls.length).toEqual(1)
    //     expect(fetch.mock.calls[0][0]).toEqual('https://google.com')
    //   })
	
    // it("is false on server unauthenticated", async () => {
	// 	_fetchMock.mock("http://localhost:3000/api/user/authorize", {
	// 		status: 401,
	// 		body: { success: false }
	// 	});
		
	// 	expect(await AuthHelper.isAuthenticated()).toBe(false);
	// });
})