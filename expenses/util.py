from random import choice, randrange


def random_color():
    return '#' + hex(randrange(0x000000, 0xFFFFFF / 3)).split('x')[1].ljust(6, '0')
