import type { ActionConfig } from "../../../actions/types";
import type { EndpointTarget } from "../../../manifest/resources";
import type { FromRef } from "../../_base/types";

/** Public config shape for the LocationInput component. */
export interface LocationInputConfig extends Record<string, unknown> {
  type: "location-input";
  label?: string;
  placeholder?: string;
  value?: string | FromRef;
  searchEndpoint: EndpointTarget;
  nameField?: string;
  addressField?: string;
  latField?: string;
  lngField?: string;
  debounceMs?: number;
  minChars?: number;
  showMapLink?: boolean;
  changeAction?: ActionConfig;
  disabled?: boolean | FromRef;
  required?: boolean;
  helperText?: string;
  errorText?: string | FromRef;
  id?: string;
  visible?: boolean | FromRef;
  style?: Record<string, string | number>;
  className?: string;
}
