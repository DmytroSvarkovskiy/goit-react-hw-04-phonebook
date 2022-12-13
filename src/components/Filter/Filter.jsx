import { WrapperFiler, FilterInput, FilterP } from './Filter.styled';
import PropTypes from 'prop-types';
export const Filter = ({ onFilterChange, value }) => {
  return (
    <WrapperFiler>
      <FilterP>Find contacts by name</FilterP>
      <FilterInput type="text" value={value} onChange={onFilterChange} />
    </WrapperFiler>
  );
};
Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
