import json
import ast
import time
import tracemalloc
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

# Load the StarCoder model
model_name = "bigcode/starcoder"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

def detect_syntax_errors(user_code):
    """Detects syntax errors in the given Python code."""
    try:
        ast.parse(user_code)
        return "✅ No syntax errors detected."
    except SyntaxError as e:
        return f"❌ Syntax error: {e}"

def measure_performance_and_memory(user_code):
    """Executes the code and measures execution time and memory usage."""
    local_env = {}
    try:
        tracemalloc.start()
        start_time = time.perf_counter()
        exec(user_code, {}, local_env)
        end_time = time.perf_counter()
        current, peak = tracemalloc.get_traced_memory()
        tracemalloc.stop()

        return f"⏳ Execution time: {round((end_time - start_time) * 1000, 4)}ms", f"📦 Memory usage: {round(peak / 1024, 2)}KB"
    except Exception as e:
        return "⚠️ Execution failed", f"Error: {str(e)}"

def generate_ai_fix(user_code):
    """Uses StarCoder to suggest improvements or fix errors in the given code."""
    input_prompt = f"### Fix the following Python code and make it more optimized:\n{user_code}\n### Optimized Code:\n"
    inputs = tokenizer(input_prompt, return_tensors="pt")

    with torch.no_grad():
        output = model.generate(**inputs, max_length=200)

    fixed_code = tokenizer.decode(output[0], skip_special_tokens=True)
    return fixed_code.split("### Optimized Code:\n")[-1].strip()

def analyze_code(user_code):
    """Main function to analyze the given code."""
    syntax_errors = detect_syntax_errors(user_code)
    execution_time, memory_usage = measure_performance_and_memory(user_code)

    # Generate AI fix using StarCoder
    fixed_code = generate_ai_fix(user_code)

    analysis_results = {
        "errors": syntax_errors,
        "performance": execution_time,
        "memory_usage": memory_usage,
        "fixed_code": fixed_code  # AI-generated improved code
    }

    return json.dumps(analysis_results, ensure_ascii=False)

if __name__ == "__main__":
    with open("user_code.py", "r", encoding="utf-8") as f:
        user_code = f.read()

    print(analyze_code(user_code))
