import { Button, FormControl, InputGroup } from "react-bootstrap";

function Search({ placeholder, inputClass, buttonClass }) {
  return (
    <>
      <InputGroup className="mb-0">
        <FormControl
          placeholder={`${placeholder}`}
          className={`${inputClass}`}
        />
        <InputGroup.Append>
          <Button
          variant=""
          className={`${buttonClass}`}>
            <i className="fa fa-search"></i>
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </>
  );
}

export default Search;
