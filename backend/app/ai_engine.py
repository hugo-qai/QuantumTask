import re
from datetime import datetime, timedelta

def parse_smart_input(text: str) -> dict:
    """
    Simulates NLP parsing.
    Input: "Email Sarah about the merger by 5pm tomorrow #urgent"
    """
    text_lower = text.lower()
    
    # Extract Tags
    smart_tags = re.findall(r"#(\w+)", text)
    
    # Priority
    priority = 50
    if "urgent" in text_lower or "#urgent" in text:
        priority = 90
    elif "important" in text_lower:
        priority = 80
        
    # Due Date (Very basic simulation)
    due_date = None
    if "tomorrow" in text_lower:
        due_date = datetime.utcnow() + timedelta(days=1)
        due_date = due_date.replace(hour=17, minute=0, second=0, microsecond=0) # Default to 5pm
    
    # Title (Remove tags)
    title = re.sub(r"#\w+", "", text).strip()
    
    return {
        "title": title,
        "due_date": due_date,
        "smart_tags": smart_tags,
        "predicted_priority": priority
    }

def quantum_sort(tasks: list) -> list:
    """
    Sorts tasks based on priority score.
    """
    # Simple sort by priority_score descending
    sorted_tasks = sorted(tasks, key=lambda x: x.priority_score, reverse=True)
    return [t.id for t in sorted_tasks]
