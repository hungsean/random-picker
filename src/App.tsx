import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Checkbox } from "./components/ui/checkbox";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";

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
    <div className="dark flex flex-col items-center min-h-screen bg-background text-foreground p-4">
      <h1 className="text-2xl font-bold mb-4 ">隨機數選取器</h1>
      <div className="flex flex-col gap-2 bg-card text-card-foreground p-4 rounded shadow-md w-80">
        <Label className="flex-col items-start gap-2 p-2">
          最小值:
          <Input
            type="number"
            value={min}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMin(Number(e.target.value))}
          />
        </Label>
        <Label className="flex-col items-start gap-2 p-2">
          最大值:
          <Input
            type="number"
            value={max}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMax(Number(e.target.value))}
          />
        </Label>
        <Label className="flex-col items-start gap-2 p-2">
          抽選數量:
          <Input
            type="number"
            value={count}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCount(Number(e.target.value))}
          />
        </Label>
        <Label className="flex items-center gap-2 p-2">
          <Checkbox
            checked={allowDuplicates}
            onCheckedChange={() => setAllowDuplicates(!allowDuplicates)}
          />
          允許重複
        </Label>
        <Label>
          排序:
          <Select
            value={sortOrder}
            onValueChange={(value: string) => setSortOrder(value as "none" | "asc" | "desc")}
            // className="border rounded p-1 w-full"
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="sorted?"  />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">不排序</SelectItem>
              <SelectItem value="asc">升序</SelectItem>
              <SelectItem value="desc">降序</SelectItem>
            </SelectContent>
          </Select>
        </Label>
        <Button
          onClick={generateRandomNumbers}
        >
          生成隨機數
        </Button>
      </div>
      {result.length > 0 && (
        <div className="mt-4 p-4 bg-card text-card-foreground shadow-md rounded">
          <h2 className="text-lg font-bold">結果:</h2>
          <p className="text-xl font-mono">{result.join(", ")}</p>
        </div>
      )}
    </div>
  );
}