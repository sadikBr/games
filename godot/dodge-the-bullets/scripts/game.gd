extends Node

@onready var player_area: Panel = $PlayerArea
@onready var player: CharacterBody2D = $Player

@export var enemy_scene: PackedScene
@onready var enemies: Node = $Enemies

@export var PLAYER_AREA_SIZE_SCALE: float = 1.0
@export var PLAYER_SIZE_SCALE: float = 1.0:
	set(new_scale):
		PLAYER_SIZE_SCALE = new_scale
		player.scale = Vector2(PLAYER_SIZE_SCALE, PLAYER_SIZE_SCALE)

func _ready() -> void:
	player.scale = Vector2(PLAYER_SIZE_SCALE, PLAYER_SIZE_SCALE)
	player_area.scale = Vector2(PLAYER_AREA_SIZE_SCALE, PLAYER_AREA_SIZE_SCALE)
	
	spawn_enemy()

func shrink_player():
	PLAYER_SIZE_SCALE *= .95
	PLAYER_SIZE_SCALE = clamp(PLAYER_SIZE_SCALE, 0.4, 1.0)
	
	if PLAYER_SIZE_SCALE <= 0.4:
		game_over()

func game_over():
	# TODO: Make this function better (maybe open a store to do some upgrades)
	get_tree().reload_current_scene()

func get_random_position() -> Vector2:
	var x = randi_range(-100, 2000)
	var y = -75 if randf() < 0.5 else 1200
	return Vector2(x, y)

func spawn_enemy():
	var enemy = enemy_scene.instantiate()
	enemy.position = get_random_position()
	enemy.add_to_group("enemies")
	enemies.add_child(enemy)

func _on_enemy_spawner_timeout() -> void:
	spawn_enemy()
