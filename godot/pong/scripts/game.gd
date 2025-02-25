extends Sprite2D

@onready var ball: CharacterBody2D = $Ball
@onready var ball_timer: Timer = $BallTimer

@onready var ai_score_label: Label = $ScoreArea/ScoreDisplay/AIScoreLabel
@onready var player_score_label: Label = $ScoreArea/ScoreDisplay/PlayerScoreLabel

var score = [0, 0] # [Player, AI]
const PADDLE_SPEED: int = 700

func print_score():
	ai_score_label.text = str(score[1])
	player_score_label.text = str(score[0])

func _on_ball_timer_timeout() -> void:
	ball.new_ball()

func _on_score_area_body_entered(_body: Node2D) -> void:
	if ball.direction.x < 0:
		score[1] += 1
	else:
		score[0] += 1
	print_score()
	ball_timer.start()
