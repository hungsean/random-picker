import { useState } from "react";
import { Button } from "./components/ui/button";

export default function App(){
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [count, setCount] = useState<number>(5);
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<"none" | "asc" | "desc">("none");
  const [result, setResult] = useState<number[]>([]);

  const generateRandomNumbers = (): void => {
    let numbers: number[] | Set<number> = new Set<number>();

    if (allowDuplicates) {
      numbers = Array.from(
        { length: count },
        () => Math.floor(Math.random() * (max - min + 1)) + min
      );
    } else {
      const range: number[] = Array.from(
        { length: max - min + 1 },
        (_, i) => i + min
      );
      if (count > range.length) {
        alert("範圍內的數字不足以產生所需數量！");
        return;
      }
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * range.length);
        numbers.add(range[randomIndex]);
        range.splice(randomIndex, 1);
      }
      numbers = Array.from(numbers);
    }

    if (sortOrder === "asc") numbers.sort((a, b) => a - b);
    if (sortOrder === "desc") numbers.sort((a, b) => b - a);

    setResult(numbers as number[]);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">隨機數選取器</h1>
      <div className="flex flex-col gap-2 bg-white p-4 rounded shadow-md w-80">
        <label>
          最小值:
          <input
            type="number"
            value={min}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMin(Number(e.target.value))}
            className="border rounded p-1 w-full"
          />
        </label>
        <label>
          最大值:
          <input
            type="number"
            value={max}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMax(Number(e.target.value))}
            className="border rounded p-1 w-full"
          />
        </label>
        <label>
          抽選數量:
          <input
            type="number"
            value={count}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCount(Number(e.target.value))}
            className="border rounded p-1 w-full"
          />
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={allowDuplicates}
            onChange={() => setAllowDuplicates(!allowDuplicates)}
          />
          允許重複
        </label>
        <label>
          排序:
          <select
            value={sortOrder}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSortOrder(e.target.value as "none" | "asc" | "desc")}
            className="border rounded p-1 w-full"
          >
            <option value="none">不排序</option>
            <option value="asc">升序</option>
            <option value="desc">降序</option>
          </select>
        </label>
        <Button
          onClick={generateRandomNumbers}
          className="bg-blue-500 text-white py-2 rounded mt-2 hover:bg-blue-700"
        >
          生成隨機數
        </Button>
      </div>
      {result.length > 0 && (
        <div className="mt-4 p-4 bg-white shadow-md rounded">
          <h2 className="text-lg font-bold">結果:</h2>
          <p className="text-xl font-mono">{result.join(", ")}</p>
        </div>
      )}
    </div>
  );
}