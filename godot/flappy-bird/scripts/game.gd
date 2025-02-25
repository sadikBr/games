extends Node

@onready var game_over_menu: CanvasLayer = $GameOverMenu

var game_started = false

func _ready() -> void:
	get_tree().paused = false
	game_over_menu.hide()

func _on_ground_body_entered(_body: Node2D) -> void:
	get_tree().paused = true
	game_over_menu.show()

func _on_game_over_menu_restart() -> void:
	get_tree().reload_current_scene()

func _on_start_timer_timeout() -> void:
	game_started = true
