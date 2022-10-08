
const Procedure = (props) => {
  return (
    <div>
        <h1>{props.pName}: $3425</h1>
        <p>Analytics:</p>
        <p>Hopitals nearby prices here</p>
        <p>Cost timeline here</p>
        <p>avg cost here</p>
        <p>cost comparisons here</p>
    </div>
  )
};

Procedure.defaultProps = {
    pName: "Default"
}

export default Procedure;