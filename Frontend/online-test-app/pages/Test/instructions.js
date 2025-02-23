import { useRouter } from "next/router";

export default function Instructions() {
  const router = useRouter();
  const { subject } = router.query; // Get subject from URL query

  const startTest = () => {
    router.push(`/api/view/testpage?subject=${subject}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Test Instructions</h2>
      <p className="mb-4 text-gray-700">Please read the instructions before starting:</p>
      <ul className="list-disc text-left space-y-2 mb-6">
        <li>You have <b>60 minutes</b> to complete the test.</li>
        <li>Do not refresh the page during the test.</li>
        <li>Make sure to submit before the timer runs out.</li>
        <li>Your progress will be saved automatically.</li>
      </ul>
      <button
        onClick={startTest}
        className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600"
      >
        Start Test
      </button>
    </div>
  );
}
