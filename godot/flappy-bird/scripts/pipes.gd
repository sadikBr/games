extends Node2D

@onready var game_over_menu: CanvasLayer = $"../../GameOverMenu"
@onready var game: Node = $"../.."
@onready var game_over_score: Label = $"../../GameOverMenu/GameOverScore"

const SCROLL_SPEED = 150

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	if get_parent().get_parent().game_started:
		position.x -= SCROLL_SPEED * delta
		if position.x < -150:
			position.x = 1000
			position.y = randi_range(250, 600)

func game_over():
	get_tree().paused = true
	game_over_score.text = "Score: " + str(game.score)
	game_over_menu.show()

func _on_area_2d_body_entered(_body: Node2D) -> void:
	game_over()

func _on_area_2d_2_body_entered(_body: Node2D) -> void:
	game_over()

func _on_score_area_body_exited(body: Node2D) -> void:
	game.update_score()
