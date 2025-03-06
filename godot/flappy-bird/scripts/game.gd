extends Node

@onready var game_over_menu: CanvasLayer = $GameOverMenu
@onready var score_label: Label = $UI/Panel/ScoreLabel
@onready var game_over_score: Label = $GameOverMenu/GameOverScore

var game_started = false
var score = 0

func _ready() -> void:
	get_tree().paused = false
	game_over_menu.hide()

func _on_ground_body_entered(_body: Node2D) -> void:
	get_tree().paused = true
	game_over_score.text = "Score: " + str(score)
	game_over_menu.show()

func _on_game_over_menu_restart() -> void:
	get_tree().reload_current_scene()

func _on_start_timer_timeout() -> void:
	game_started = true

func update_score():
	score += 1
	score_label.text = "Score: " + str(score)
