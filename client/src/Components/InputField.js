import { Field as FormikField } from "formik";
import { Button } from "react-bootstrap";

function InputField({
  element,
  name,
  type,
  placeholder,
  className,
  btnType,
  btnText,onChange,value
}) {
  return (
    <>
      {element === "input" ? (
        <FormikField
          name={name}
          id={name}
          className={`form-control ${className}`}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          value={value}
          
        />
      ) : (
        <Button
          type={btnType}
          variant=""
          className={`btn-next ${className}`}
          dangerouslySetInnerHTML={{
            __html: btnText,
          }}
        />
      )}
    </>
  );
}

export default InputField;
