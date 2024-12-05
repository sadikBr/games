import tkinter as tk
from tkinter import messagebox, simpledialog
import random
import time
import json
import os
from PIL import Image, ImageTk

class TypingSpeedGame:
    def __init__(self, master):
        self.master = master
        self.master.title("Typing Speed Master")
        self.master.geometry("800x600")
        self.master.configure(bg="#2C3E50")

        # Game data
        self.sentences = [
            "The quick brown fox jumps over the lazy dog",
            "Programming is fun and challenging",
            "Python is a powerful and versatile language",
            "Practice makes perfect in typing",
            "Coding requires patience and persistence",
            "Machine learning is transforming technology",
            "Data science opens new possibilities",
            "Artificial intelligence is rapidly evolving"
        ]

        # High scores file
        # self.high_scores_file = "high_scores.json"
        # self.high_scores = self.load_high_scores()

        # Game variables
        self.current_sentence = ""
        self.start_time = 0
        self.is_game_active = False

        # Create UI
        self.create_ui()

    def create_ui(self):
        # Title
        title_label = tk.Label(
            self.master,
            text="Typing Speed Master",
            font=("Arial", 24, "bold"),
            bg="#2C3E50",
            fg="white"
        )
        title_label.pack(pady=20)

        # Sentence Display
        self.sentence_label = tk.Label(
            self.master,
            text="Click 'Start Game' to begin",
            font=("Consolas", 16),
            bg="#34495E",
            fg="white",
            wraplength=700
        )
        self.sentence_label.pack(pady=20)

        # Text Entry
        self.typing_entry = tk.Entry(
            self.master,
            font=("Arial", 14),
            width=50,
            state='disabled'
        )
        self.typing_entry.pack(pady=10)
        self.typing_entry.bind('<Return>', self.check_typing)

        # Buttons Frame
        button_frame = tk.Frame(self.master, bg="#2C3E50")
        button_frame.pack(pady=10)

        # Buttons
        start_button = tk.Button(
            button_frame,
            text="Start Game",
            command=self.start_game,
            font=("Arial", 12),
            bg="#3498DB",
            fg="white"
        )
        start_button.pack(side=tk.LEFT, padx=10)

        # high_scores_button = tk.Button(
        #     button_frame,
        #     text="High Scores",
        #     command=self.show_high_scores,
        #     font=("Arial", 12),
        #     bg="#2ECC71",
        #     fg="white"
        # )
        # high_scores_button.pack(side=tk.LEFT, padx=10)

        # Results Display
        self.results_label = tk.Label(
            self.master,
            text="",
            font=("Arial", 14),
            bg="#2C3E50",
            fg="white"
        )
        self.results_label.pack(pady=10)

    def start_game(self):
        # Reset game state
        self.current_sentence = random.choice(self.sentences)
        self.sentence_label.config(text=self.current_sentence)
        self.typing_entry.config(state='normal')
        self.typing_entry.delete(0, tk.END)
        self.typing_entry.focus()

        # Start timing
        self.start_time = time.time()
        self.is_game_active = True
        self.results_label.config(text="")

    def check_typing(self, event=None):
        if not self.is_game_active:
            return

        # Calculate results
        typed_text = self.typing_entry.get()
        end_time = time.time()

        # Calculate WPM and Accuracy
        wpm = self.calculate_wpm(typed_text, self.start_time, end_time)
        accuracy = self.calculate_accuracy(self.current_sentence, typed_text)

        # Display and save results
        result_text = f"WPM: {wpm} | Accuracy: {accuracy}%"
        self.results_label.config(text=result_text)

        # Save high score
        # self.save_high_score(wpm, accuracy)

        # Disable typing
        self.typing_entry.config(state='disabled')
        self.is_game_active = False

    def calculate_wpm(self, typed_text, start_time, end_time):
        total_time = end_time - start_time
        words = typed_text.split()
        word_count = len(words)
        wpm = int((word_count / total_time) * 60)
        return max(0, wpm)

    def calculate_accuracy(self, original_text, typed_text):
        original_words = original_text.split()
        typed_words = typed_text.split()

        correct_words = sum(1 for orig, typed in zip(original_words, typed_words) if orig == typed)
        accuracy = (correct_words / len(original_words)) * 100
        return round(accuracy, 2)

    # def save_high_score(self, wpm, accuracy):
    #     # Get player name
    #     player_name = simpledialog.askstring("Input", "Enter your name:")
    #     if player_name:
    #         score_entry = {
    #             "name": player_name,
    #             "wpm": wpm,
    #             "accuracy": accuracy,
    #             "timestamp": time.time()
    #         }
    #         self.high_scores.append(score_entry)

    #         # Sort and keep top 10 scores
    #         self.high_scores.sort(key=lambda x: x['wpm'], reverse=True)
    #         self.high_scores = self.high_scores[:10]

    #         # Save to file
    #         with open(self.high_scores_file, 'w') as f:
    #             json.dump(self.high_scores, f)

    # def load_high_scores(self):
    #     if os.path.exists(self.high_scores_file):
    #         with open(self.high_scores_file, 'r') as f:
    #             return json.load(f)
    #     return []

    # def show_high_scores(self):
    #     # Create high scores window
    #     scores_window = tk.Toplevel(self.master)
    #     scores_window.title("High Scores")
    #     scores_window.geometry("400x500")
    #     scores_window.configure(bg="#2C3E50")

    #     # Title
    #     title = tk.Label(
    #         scores_window,
    #         text="High Scores",
    #         font=("Arial", 20, "bold"),
    #         bg="#2C3E50",
    #         fg="white"
    #     )
    #     title.pack(pady=10)

    #     # Scores display
    #     if not self.high_scores:
    #         no_scores = tk.Label(
    #             scores_window,
    #             text="No high scores yet!",
    #             font=("Arial", 14),
    #             bg="#2C3E50",
    #             fg="white"
    #         )
    #         no_scores.pack(pady=20)
    #     else:
    #         for i, score in enumerate(self.high_scores, 1):
    #             score_text = f"{i}. {score['name']} - WPM: {score['wpm']} (Accuracy: {score['accuracy']}%)"
    #             score_label = tk.Label(
    #                 scores_window,
    #                 text=score_text,
    #                 font=("Arial", 12),
    #                 bg="#34495E",
    #                                     fg="white"
    #             )
    #             score_label.pack(pady=5)

def main():
    root = tk.Tk()

    # # Set up application icon
    # try:
    #     icon = tk.PhotoImage(file='typing_icon.png')
    #     root.iconphoto(True, icon)
    # except:
    #     print("Icon not found. Using default icon.")

    # Configure root window styling
    root.configure(bg="#2C3E50")

    # Create game instance
    game = TypingSpeedGame(root)

    # Center the window
    root.update()
    width = root.winfo_width()
    height = root.winfo_height()
    x = (root.winfo_screenwidth() // 2) - (width // 2)
    y = (root.winfo_screenheight() // 2) - (height // 2)
    root.geometry(f'{width}x{height}+{x}+{y}')

    root.mainloop()

if __name__ == "__main__":
    main()
