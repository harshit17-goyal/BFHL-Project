export default function Results({ data, filters }) {
    if (!data) return null;
  
    const renderFilteredResponse = () => {
      const response = [];
  
      if (filters.includes('Numbers') && data.numbers && data.numbers.length > 0) {
        response.push(
          <div key="numbers">
            <span className="font-bold">Numbers: </span>
            {data.numbers.join(',')}
          </div>
        );
      }
  
      if (filters.includes('Highest Alphabet') && 
          data.highest_alphabet && 
          data.highest_alphabet.length > 0) {
        response.push(
          <div key="highest">
            <span className="font-bold">Highest Alphabet: </span>
            {data.highest_alphabet[0]}
          </div>
        );
      }
  
      return response;
    };
  
    return (
      <div className="w-full max-w-2xl mx-auto mt-4">
        <h2 className="text-lg font-medium mb-2">Filtered Response</h2>
        <div className="space-y-2">
          {renderFilteredResponse()}
        </div>
      </div>
    );
  }