import React from "react";
import * as PropTypes from "prop-types";
import { Select, Input } from "antd";

interface FilterProps {
  values: string[];
  onChange: (values: string[]) => void;
}

type FilterType = {
  string: React.FC<FilterProps>;
  number: React.FC<FilterProps>;
};

const FilterInputs: FilterType = {
  string: ({ values, onChange }) => (
    <Select
      key="input"
      style={{
        width: 300
      }}
      mode="tags"
      onChange={onChange}
      value={values}
    />
  ),
  number: ({ values, onChange }) => (
    <Input
      key="input"
      style={{
        width: 300
      }}
      onChange={(e) => onChange([e.target.value])}
      value={(values && values[0]) || ""}
    />
  )
};

FilterInputs.string.propTypes = {
  //values: PropTypes.array,
  onChange: PropTypes.func.isRequired
};
FilterInputs.string.defaultProps = {
  values: []
};

FilterInputs.number.propTypes = {
  //values: PropTypes.array,
  onChange: PropTypes.func.isRequired
};
FilterInputs.number.defaultProps = {
  values: []
};

interface FilterInputProps {
  member: { dimension: { type: keyof FilterType }; values: string[] };
  updateMethods: { update: (m: any, d: any) => void };
}

const FilterInput: React.FC<FilterInputProps> = ({ member, updateMethods }) => {
  const Filter = FilterInputs[member.dimension.type] || FilterInputs.string;
  return (
    <Filter
      key="filter"
      values={member.values}
      onChange={(values) => updateMethods.update(member, { ...member, values })}
    />
  );
};

/*FilterInput.propTypes = {
    member: PropTypes.shape({
        dimension: PropTypes.shape({
          type: PropTypes.oneOf(Object.keys(FilterInputs)) // Ensure `type` is one of the keys in `FilterInputs`
        }).isRequired,
        values: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    updateMethods: PropTypes.shape({
        update: PropTypes.func.isRequired
    }).isRequired
};*/

export default FilterInput;
