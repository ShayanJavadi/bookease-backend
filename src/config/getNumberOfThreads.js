import getVariable from "./getVariable";

export default () => getVariable("WEB_CONCURRENCY") || 1;
