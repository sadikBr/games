extends Node

@onready var game_over_menu: CanvasLayer = $GameOverMenu

func _ready() -> void:
	get_tree().paused = false
	game_over_menu.hide()

func _on_ground_body_entered(body: Node2D) -> void:
	get_tree().paused = true
	game_over_menu.show()

func _on_game_over_menu_restart() -> void:
	get_tree().reload_current_scene()
