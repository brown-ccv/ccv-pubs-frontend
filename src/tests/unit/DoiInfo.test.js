import React from 'react';
import { DoiInfo } from '../../components/DoiInfo';
import { shallow } from 'enzyme';

let updateDoiInfo = jest.fn();
let postPubAction = jest.fn();
function shallowSetup() {
  const props = {
    doiInfo: { data: {}, status: 'empty' },
    updateDoiInfo: updateDoiInfo,
    postPubAction: postPubAction,
  };
  const wrapper = shallow(<DoiInfo {...props} />);
  return {
    props,
    wrapper,
  };
}
function shallowSetupFilled() {
  const props = {
    doiInfo: {
      data: { title: 'Test', author: 'John Smith', month: 5, year: 2000 },
      status: 'empty',
    },
    updateDoiInfo: updateDoiInfo,
    postPubAction: postPubAction,
  };
  const wrapper = shallow(<DoiInfo {...props} />);
  return {
    props,
    wrapper,
  };
}

describe('DoiInfo Component Tests', () => {
  it('DoiInfo exists', () => {
    const { wrapper, props } = shallowSetup();
    expect(wrapper.props().className).toEqual('DoiInfo');
  });

  it('renders with correct empty Form', () => {
    const { wrapper, props } = shallowSetup();
    expect(wrapper.find('Form').hasClass('DoiForm')).toBe(true);
    expect(wrapper.find('FormGroup').length).toBe(9);

    expect(wrapper.find('FormLabel').first().text()).toBe('Title');
    expect(wrapper.find('FormControl').first().props().placeholder).toBe('Enter Title');
    expect(wrapper.find('FormControl').first().props().defaultValue).toBeUndefined();

    expect(wrapper.find('FormLabel').at(1).text()).toBe('Author(s)');
    expect(wrapper.find('FormControl').at(1).props().placeholder).toBe(
      'Enter Author(s) names (ex. John Smith, Jane Doe, ...)'
    );
    expect(wrapper.find('FormControl').at(1).props().defaultValue).toBeUndefined();

    expect(wrapper.find('FormLabel').at(2).text()).toBe('Publisher');
    expect(wrapper.find('FormControl').at(2).props().placeholder).toBe('Enter Publisher');
    expect(wrapper.find('FormControl').at(2).props().defaultValue).toBeUndefined();

    expect(wrapper.find('FormLabel').at(3).text()).toBe('Volume');
    expect(wrapper.find('FormControl').at(3).props().placeholder).toBe('Enter Volume');
    expect(wrapper.find('FormControl').at(3).props().defaultValue).toBeUndefined();

    expect(wrapper.find('FormLabel').at(4).text()).toBe('URL');
    expect(wrapper.find('FormControl').at(4).props().placeholder).toBe('Enter URL');
    expect(wrapper.find('FormControl').at(4).props().defaultValue).toBeUndefined();

    expect(wrapper.find('FormLabel').at(5).text()).toBe('DOI');
    expect(wrapper.find('FormControl').at(5).props().placeholder).toBe('Enter DOI');
    expect(wrapper.find('FormControl').at(5).props().defaultValue).toBeUndefined();

    expect(wrapper.find('FormLabel').at(6).text()).toBe('Month of Publication');
    expect(wrapper.find('FormControl').at(6).props().placeholder).toBe('Enter Month (ex. 5)');
    expect(wrapper.find('FormControl').at(6).props().defaultValue).toBeUndefined();

    expect(wrapper.find('FormLabel').at(7).text()).toBe('Year of Publication');
    expect(wrapper.find('FormControl').at(7).props().placeholder).toBe('Enter Year (ex. 2000)');
    expect(wrapper.find('FormControl').at(7).props().defaultValue).toBeUndefined();

    expect(wrapper.find('FormLabel').at(8).text()).toBe('Abstract');
    expect(wrapper.find('FormControl').at(8).props().placeholder).toBe('Enter Abstract');
    expect(wrapper.find('FormControl').at(8).props().defaultValue).toBeUndefined();
  });

  it('renders with correct filled in form', () => {
    const { wrapper, props } = shallowSetupFilled();

    expect(wrapper.find('Form').hasClass('DoiForm')).toBe(true);
    expect(wrapper.find('FormGroup').length).toBe(9);

    expect(wrapper.find('FormLabel').first().text()).toBe('Title');
    expect(wrapper.find('FormControl').first().props().placeholder).toBe('Enter Title');
    expect(wrapper.find('FormControl').first().props().defaultValue).toBe('Test');

    expect(wrapper.find('FormLabel').at(1).text()).toBe('Author(s)');
    expect(wrapper.find('FormControl').at(1).props().placeholder).toBe(
      'Enter Author(s) names (ex. John Smith, Jane Doe, ...)'
    );
    expect(wrapper.find('FormControl').at(1).props().defaultValue).toBe('John Smith');

    expect(wrapper.find('FormLabel').at(2).text()).toBe('Publisher');
    expect(wrapper.find('FormControl').at(2).props().placeholder).toBe('Enter Publisher');
    expect(wrapper.find('FormControl').at(2).props().defaultValue).toBeUndefined();

    expect(wrapper.find('FormLabel').at(3).text()).toBe('Volume');
    expect(wrapper.find('FormControl').at(3).props().placeholder).toBe('Enter Volume');
    expect(wrapper.find('FormControl').at(3).props().defaultValue).toBeUndefined();

    expect(wrapper.find('FormLabel').at(4).text()).toBe('URL');
    expect(wrapper.find('FormControl').at(4).props().placeholder).toBe('Enter URL');
    expect(wrapper.find('FormControl').at(4).props().defaultValue).toBeUndefined();

    expect(wrapper.find('FormLabel').at(5).text()).toBe('DOI');
    expect(wrapper.find('FormControl').at(5).props().placeholder).toBe('Enter DOI');
    expect(wrapper.find('FormControl').at(5).props().defaultValue).toBeUndefined();

    expect(wrapper.find('FormLabel').at(6).text()).toBe('Month of Publication');
    expect(wrapper.find('FormControl').at(6).props().placeholder).toBe('Enter Month (ex. 5)');
    expect(wrapper.find('FormControl').at(6).props().defaultValue).toBe(5);

    expect(wrapper.find('FormLabel').at(7).text()).toBe('Year of Publication');
    expect(wrapper.find('FormControl').at(7).props().placeholder).toBe('Enter Year (ex. 2000)');
    expect(wrapper.find('FormControl').at(7).props().defaultValue).toBe(2000);

    expect(wrapper.find('FormLabel').at(8).text()).toBe('Abstract');
    expect(wrapper.find('FormControl').at(8).props().placeholder).toBe('Enter Abstract');
    expect(wrapper.find('FormControl').at(8).props().defaultValue).toBeUndefined();
  });

  describe('Editing doiInfo', () => {
    let _wrapper, props;
    //In this before each, we are opening the form and changing the to-do title value before each of the tests is run. This helps us to avoid having to do this repeatedly for every it block.
    beforeEach(() => {
      // spy on the component handleFieldChange method
      const spy = jest.spyOn(DoiInfo.prototype, 'onTextChange');
      // spy on the component handleEdit method
      //   sinon.spy(Todo.prototype, "handleEdit");
      //   // spy on the component handleClose method
      //   sinon.spy(Todo.prototype, "handleClose");
      const { wrapper, props } = shallowSetup();
      _wrapper = wrapper;
      //   const button = wrapper.find('button').first();
      //   button.simulate('click');
      // find the input field containing the todo title and simulate a change to it's value
      const titleInput = _wrapper.find('FormControl').at(0);
      titleInput.simulate('change', {
        target: {
          value: 'Changed Title',
          type: 'title',
        },
      });
    });
    afterEach(() => {
      // jest.restoreAllMocks()
    });
    it('should change state when input values change and call handleFieldChange', () => {
      //const { wrapper, props } = shallowSetup();
      // this.state.todo should now have a title field with it's value as the new title we entered.
      expect(updateDoiInfo.mock.calls[0][0]['data']['title']).toEqual('Changed Title');

      // Since we simulated a change to an input field, the handleFieldChange event handler should be called.
      expect(updateDoiInfo.mock.calls.length).toBe(1);

      const authorInput = _wrapper.find('FormControl').at(1);
      authorInput.simulate('change', {
        target: {
          value: 'Changed Author',
          type: 'author',
        },
      });

      expect(updateDoiInfo.mock.calls[0][0]['data']['author']).toEqual('Changed Author');

      // Since we simulated a change to an input field, the handleFieldChange event handler should be called.
      expect(updateDoiInfo.mock.calls.length).toBe(2);

      const publisherInput = _wrapper.find('FormControl').at(2);
      publisherInput.simulate('change', {
        target: {
          value: 'Changed Publisher',
          type: 'publisher',
        },
      });

      expect(updateDoiInfo.mock.calls[0][0]['data']['publisher']).toEqual('Changed Publisher');

      // Since we simulated a change to an input field, the handleFieldChange event handler should be called.
      expect(updateDoiInfo.mock.calls.length).toBe(3);

      const volumeInput = _wrapper.find('FormControl').at(3);
      volumeInput.simulate('change', {
        target: {
          value: 5,
          type: 'volume',
        },
      });

      expect(updateDoiInfo.mock.calls[0][0]['data']['volume']).toEqual(5);

      // Since we simulated a change to an input field, the handleFieldChange event handler should be called.
      expect(updateDoiInfo.mock.calls.length).toBe(4);

      const urlInput = _wrapper.find('FormControl').at(4);
      urlInput.simulate('change', {
        target: {
          value: 'www.test.com',
          type: 'url',
        },
      });

      expect(updateDoiInfo.mock.calls[0][0]['data']['url']).toEqual('www.test.com');

      // Since we simulated a change to an input field, the handleFieldChange event handler should be called.
      expect(updateDoiInfo.mock.calls.length).toBe(5);

      const doiInput = _wrapper.find('FormControl').at(5);
      doiInput.simulate('change', {
        target: {
          value: '10.1038/nphys1170',
          type: 'doi',
        },
      });

      expect(updateDoiInfo.mock.calls[0][0]['data']['doi']).toEqual('10.1038/nphys1170');

      // Since we simulated a change to an input field, the handleFieldChange event handler should be called.
      expect(updateDoiInfo.mock.calls.length).toBe(6);

      const monthInput = _wrapper.find('FormControl').at(6);
      monthInput.simulate('change', {
        target: {
          value: 10,
          type: 'month',
        },
      });

      expect(updateDoiInfo.mock.calls[0][0]['data']['month']).toEqual(10);

      // Since we simulated a change to an input field, the handleFieldChange event handler should be called.
      expect(updateDoiInfo.mock.calls.length).toBe(7);

      const yearInput = _wrapper.find('FormControl').at(7);
      yearInput.simulate('change', {
        target: {
          value: 2000,
          type: 'year',
        },
      });

      expect(updateDoiInfo.mock.calls[0][0]['data']['year']).toEqual(2000);

      // Since we simulated a change to an input field, the handleFieldChange event handler should be called.
      expect(updateDoiInfo.mock.calls.length).toBe(8);

      const abstractInput = _wrapper.find('FormControl').at(8);
      abstractInput.simulate('change', {
        target: {
          value: 'This is a test',
          type: 'abstract',
        },
      });

      expect(updateDoiInfo.mock.calls[0][0]['data']['abstract']).toEqual('This is a test');

      // Since we simulated a change to an input field, the handleFieldChange event handler should be called.
      expect(updateDoiInfo.mock.calls.length).toBe(9);
      expect(updateDoiInfo.mock.calls[0][0]['data']).toEqual({
        abstract: 'This is a test',
        author: 'Changed Author',
        doi: '10.1038/nphys1170',
        month: 10,
        publisher: 'Changed Publisher',
        title: 'Changed Title',
        url: 'www.test.com',
        volume: 5,
        year: 2000,
      });
    });

    // describe('Submit edits', () => {
    //   it('should call handleEdit, editTodo and handleClose when update button is clicked', () => {
    //     const button = wrapper.find('button.ui.basic.green.button');
    //     button.simulate('click');
    //     // Confirm that the different component methods called when we submit edits are called.
    //     expect(Todo.prototype.handleEdit.calledOnce).toBe(true);
    //     expect(Todo.prototype.handleClose.calledOnce).toBe(true);
    //     // the mock function we passed to the renderer instead of the action should be called and with the new values we entered.
    //     expect(editTodo).toBeCalledWith(props_.id, {"title": "Changed title"});
    //   });
    // });
  });
});
