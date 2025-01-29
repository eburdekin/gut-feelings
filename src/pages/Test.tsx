import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient.ts";

interface Symptom {
  id: number;
  name: string;
  type: string;
}

const Test = () => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);

  useEffect(() => {
    getSymptoms();
  }, []);

  const getSymptoms = async () => {
    const { data } = await supabase.from("symptoms").select();
    setSymptoms(data || []);
  };

  return (
    <ul>
      {symptoms.map((symptom) => (
        <li key={symptom.name}>
          {symptom.name} - {symptom.type}
        </li>
      ))}
    </ul>
  );
};

export default Test;
