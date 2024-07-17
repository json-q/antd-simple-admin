const Analysis: React.FC = () => {
  return (
    <div>
      Analysis
      {new Array(50).fill(null).map((_, index) => (
        <div key={index}>tag {index}</div>
      ))}
    </div>
  );
};

export default Analysis;
