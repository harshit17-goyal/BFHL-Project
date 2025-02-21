import { useState } from 'react';
import Head from 'next/head';
import Form from '../components/Form';
import MultiFilter from '../components/MultiFilter';
import Results from '../components/Results';

const ROLL_NUMBER = "YOUR_ROLL_NUMBER"; // Replace with your roll number

export default function Home() {
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState(['Numbers', 'Highest Alphabet']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (inputData) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Sending data:', inputData); // Debug log
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bfhl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data); // Debug log
      setApiResponse(data);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{ROLL_NUMBER}</title>
      </Head>

      <main className="container mx-auto px-4 py-8">
        <Form onSubmit={handleSubmit} />
        
        {error && (
          <div className="text-red-500 text-center mt-4">
            Error: {error}
          </div>
        )}

        {loading && (
          <div className="text-center mt-4">
            Processing...
          </div>
        )}

        {apiResponse && (
          <>
            <MultiFilter 
              onChange={setSelectedFilters}
              data={apiResponse}
            />
            <Results 
              data={apiResponse}
              filters={selectedFilters}
            />
          </>
        )}
      </main>
    </>
  );
}