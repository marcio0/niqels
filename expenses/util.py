from random import choice, randrange


def random_color():
    def random_segment():
        return hex(randrange(0x11, 0xff * 0.8)).split('x')[1].ljust(2, '0')
    return '#%s%s%s' % (random_segment(), random_segment(), random_segment())
