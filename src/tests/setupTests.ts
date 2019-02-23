/* A light wrapper to apply enzyme adapter configuration and expose enzyme members */

import "raf/polyfill";

import { configure, shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16"

configure({ adapter: new Adapter() });

export { shallow, mount, render };