class_name Card extends Node2D

func hover_effect():
	position.y -= 50
	rotation = 0
	z_index = 100
