"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_1 = require("../../runtime");
const adapter_1 = require("./adapter");
(0, runtime_1.setAbstractFetchFunc)(adapter_1.mockFetch);
(0, runtime_1.setAbstractConvertRequestFunc)(adapter_1.mockConvertRequest);
(0, runtime_1.setAbstractConvertResponseFunc)(adapter_1.mockConvertResponse);
(0, runtime_1.setAbstractConvertHeadersFunc)(adapter_1.mockConvertHeaders);
(0, runtime_1.setAbstractRuntimeString)(adapter_1.mockRuntimeString);
//# sourceMappingURL=index.js.map