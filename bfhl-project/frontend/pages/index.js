import { useState } from 'react';
import Head from 'next/head';
import Form from '../components/Form';
import MultiFilter from '../components/MultiFilter';
import Results from '../components/Results';

const ROLL_NUMBER = "22BCS16612"; // Replace with your roll number

export default function Home() {
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState(['Numbers', 'Highest Alphabet']);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (inputData) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bfhl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error('Error:', error);
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
  
          {loading && (
            <div className="text-center mt-4">
              Processing...
            </div>
          )}
        </main>
      </>
    );
  }